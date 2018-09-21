import { expect } from 'chai';
import moxios from 'moxios';
import { stub } from 'sinon';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as UserActions from '../../../actions/users';
import * as MiscActions from '../../../actionTypes/misc';
import * as OrderActions from '../../../actions/orders';

const store = configureStore([thunk])({
  users: { current: { id: 1, firstname: 'Hasstrup' } },
  kitchens: { target: { name: 'Afang Kitchen' } },
  meals: { belongsToUser: [{ id: 1 }] },
  orders: { allOrders: { 1: [] } }
});

const userStub = stub(UserActions, 'GetLoggedInUser');

/* eslint no-unused-expressions: 0 */
let data;
let targetActions;

describe('Order action creators', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });
  afterAll(() => userStub.restore());

  it('Should create the right order after request to api', async () => {
    try {
      data = { meals: [{ name: 'Afang soup' }] };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        MiscActions.EndProcess(),
        {
          type: 'SET_ALL_ORDERS',
          payload: [data],
          id: 1
        }
      ];
      userStub.returns(true);
      await store.dispatch(OrderActions.CreateOrder(data)({ push: () => {} }));
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (err) {
      expect(err).to.not.exist;
    }
  });

  it('should successfully fetch all the orders belonging to a user', async () => {
    try {
      data = [{ name: 'Afang soup' }];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        MiscActions.StartProcess(),
        MiscActions.EndProcess(),
        {
          type: 'SET_ALL_ORDERS',
          payload: data
        },
      ];
      await store.dispatch(OrderActions.fetchAllOrders()());
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    } catch (e) {
      expect(e).to.not.exist;
    }
  });
});
