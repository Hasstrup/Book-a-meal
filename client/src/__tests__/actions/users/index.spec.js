import { expect } from 'chai';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { spy, stub } from 'sinon';
import { CacheHandler } from '../../../actions/helpers/';
import * as MiscActions from '../../../actionTypes/misc';
import { SignUpUser, LogInUser, FetchUser } from '../../../actions/users/';

const store = configureStore([thunk])({ users: { current: 1 } });

/* eslint no-unused-expressions: 0, object-curly-newline: 0, padded-blocks: 0 */
const fakeHistory = { push: () => {} };
const testSpy = spy(fakeHistory, 'push');
let data;
let payload;
let targetActions;

const LocalStorageStub = stub(CacheHandler(), 'setContent');


describe('Users Action creators', () => {
/* hooks to install moxios  */
  describe('Sign up users', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); store.clearActions(); });
    afterAll(() => LocalStorageStub.restore());

    it('should successfully make a call to the api and sign up the user', async () => {
      try {
        payload = { username: 'testUsername', password: 'Onosetale32', email: 'hasstrup.eze@gmail.com', firstname: 'HasstrupEzekiel' };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({ status: 201, response: { data: payload } });
        });

        targetActions = [
          MiscActions.StartProcess(),
          { type: 'NEW_SIGN_IN', payload },
          MiscActions.EndProcess(),
          MiscActions.DispatchNotification('Welcome to Book A Meal HasstrupEzekiel. I\'m jarvis, here to help :)')];
        await store.dispatch(SignUpUser(data)(fakeHistory));
        expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
        expect(testSpy.calledWith('/catalogue')).to.be.true;
      } catch (err) {
        expect(err).not.to.exist;
      }
    });

    it('should successfully log in a user to the application', async () => {
      data = { username: 'testUsername', password: 'Onosetale' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      await store.dispatch(LogInUser(data)(fakeHistory));
      targetActions = [
        MiscActions.StartProcess(),
        { type: 'NEW_SIGN_IN', payload: { data } },
        MiscActions.EndProcess(),
      ];
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
      expect(testSpy.calledWith('/catalogue')).to.be.true;
    });

    it('should successfully fetch a target user', async () => {
      data = { username: 'testUsername', password: 'Onosetale' };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      targetActions = [
        { type: 'TARGET_USER_FETCHED', payload: data },
      ];
      await store.dispatch(FetchUser());
      expect(JSON.stringify(store.getActions())).to.equal(JSON.stringify(targetActions));
    });
  });
});
