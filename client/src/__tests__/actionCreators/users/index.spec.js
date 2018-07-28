import { expect } from 'chai';
import moxios from 'moxios';
import { spy } from 'sinon';
import { SignUpUser, LogInUser } from '../../../actions/users/';
import store from '../../../../store';

/* eslint no-unused-expressions: 0, object-curly-newline: 0, padded-blocks: 0 */
const fakeHistory = { push: () => {} };
let data;

describe('Users Action creators', () => {
/* hooks to install moxios  */
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); });

  describe('Sign up users', () => {

    it('should successfully make a call to the api and sign up the user', async () => {
      try {
        data = { username: 'testUsername', password: 'Onosetale32', email: 'hasstrup.eze@gmail.com', firstname: 'HasstrupEzekiel' };
        // mocking axios to make sure it returns the right response;
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({ status: 201, response: { data } });
        });
        const testSpy = spy(fakeHistory, 'push');
        await store.dispatch(SignUpUser(data)(fakeHistory));
        expect(store.getState().users.current.data.username).to.equal('testUsername');
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
      expect(store.getState().users.current.data.username).to.equal('testUsername');
    });
  });
});
