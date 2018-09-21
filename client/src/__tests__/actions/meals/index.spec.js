import { expect } from 'chai';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as MiscActions from '../../../actionTypes/misc';
import MealActions, { editMealInformation, deleteMeal } from '../../../actions/meals';

const store = configureStore([thunk])({
  users: { current: 1 },
  kitchens: { target: { name: 'Afang Kitchen' } },
  meals: { belongsToUser: [{ id: 1 }] }
});

/* eslint no-unused-expressions: 0 */
let data;
let targetActions;

describe('Meal action creators', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('Should create the right meal after request to api', async () => {
    try {
      data = { name: 'Afang soup' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        {
          type: 'NEW_MEAL',
          payload: [data, { id: 1 }]
        },
        MiscActions.DispatchNotification('Great job! Successfully uploaded'),
        MiscActions.EndProcess()
      ];
      await store.dispatch(MealActions.createNewMeal(data)(() => {}));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (err) {
      expect(err).to.not.exist;
    }
  });

  it('should successfully fetch all the meals belonging to a user', async () => {
    try {
      data = [{ name: 'Afang soup' }];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        {
          type: 'ALL_MEALS_FETCHED_FOR_USER',
          payload: data
        },
      ];
      await store.dispatch(MealActions.fetchAllMealsBelongingToUser());
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Should edit a meal Information', async () => {
    try {
      data = { name: 'Afang soup', id: 1 };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        {
          type: 'ALL_MEALS_FETCHED_FOR_USER',
          payload: [data]
        },
        MiscActions.EndProcess(),
        MiscActions.DispatchNotification('Awesome, that was edited successfully')
      ];
      await store.dispatch(editMealInformation(data)({}));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Should delete a meal from the users kitchen', async () => {
    try {
      data = { name: 'Afang soup', id: 1 };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        {
          type: 'ALL_MEALS_FETCHED_FOR_USER',
          payload: []
        },
        MiscActions.EndProcess()
      ];
      await store.dispatch(deleteMeal(1));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });
});
