import { expect } from 'chai';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as MiscActions from '../../../actionTypes/misc';
import * as MenuActions from '../../../actions/menus/';

const store = configureStore([thunk])({ users: { current: 1 }, kitchens: { target: { name: 'Afang Kitchen' } } });

/* eslint no-unused-expressions: 0 */
let data;
let targetActions;

describe('Menus action creators', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('Should successfully fetch the catalogue from the Server', async () => {
    try {
      data = [{ name: 'Afang soup' }];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        {
          type: 'CATALOGUE_FETCHED',
          payload: data
        },
        MiscActions.EndProcess()
      ];
      await store.dispatch(MenuActions.FetchCatalogue());
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (err) {
      expect(err).to.not.exist;
    }
  });

  it('Should successfully post a menu of the day', async () => {
    try {
      data = { name: 'Afang soup' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        {
          type: 'MENU_OF_THE_DAY',
          payload: data
        },
        MiscActions.EndProcess(),
        MiscActions.DispatchNotification('Afang soup is now set as the menu of the day for Afang Kitchen')
      ];
      await store.dispatch(MenuActions.SetMenuOfTheDay(data));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Should fetch the menu of the day of the current user', async () => {
    try {
      data = { name: 'Afang soup', menus: [{ id: 1, name: 'Test Menu of the day' }], MenuofTheDay: 1 };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        {
          type: 'MENU_OF_THE_DAY',
          payload: data.menus[0]
        }
      ];
      await store.dispatch(MenuActions.fetchMenuOfTheDayOfUser(data));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Should fetch a specific menu when called with an id', async () => {
    try {
      data = { name: 'Afang soup' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        MiscActions.EndProcess(),
        {
          type: 'TARGET_MENU_FETCHED',
          payload: data
        }
      ];
      await store.dispatch(MenuActions.FetchSpecificMenu(1)({ push: () => {} })());
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });
});
