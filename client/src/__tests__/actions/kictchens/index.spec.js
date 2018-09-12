import { expect } from 'chai';
import moxios from 'moxios';
import { stub } from 'sinon';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as MiscActions from '../../../actionTypes/misc';
import KitchenActions from '../../../actions/kitchens';

const store = configureStore([thunk])({
  users: { current: { firstname: 'Hasstrup' } },
  kitchens: { target: null }
});

const documentStub = stub(document, 'getElementsByClassName');

/* eslint no-unused-expressions: 0 */
let data;
let targetActions;

describe('Kitchen action creators', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });
  afterAll(() => documentStub.restore());

  it('Should set up a kitchen for the user', async () => {
    try {
      data = { name: 'Afang soup', description: 'A test description' };
      documentStub.returns([{ style: { display: 'block' } }]);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        MiscActions.EndProcess(),
        {
          type: 'TARGET_KITCHEN_FETCHED',
          payload: data
        },
        MiscActions.DispatchNotification('Awesome Hasstrup!, now you can start sharing your meals')
      ];
      await store.dispatch(KitchenActions.SetUpNewKitchen(data));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (err) {
      expect(err).to.not.exist;
    }
  });
});
