import { expect } from 'chai';
import userReducer from '../../reducers/users';

let state;
let action;

describe('User reducers', () => {
  it('Should return the initial state', () => {
    state = userReducer(undefined, {});
    expect(state).to.have.a.property('requiresPermission');
    expect(state.requiresPermission).to.equal(false);
  });

  it("Should return a user object as the payload after 'NEW_SIGN_IN'", () => {
    action = {
      type: 'NEW_SIGN_IN',
      payload: {
        name: 'Hasstrup Ezekiel'
      }
    };
    state = userReducer({}, action);
    expect(state).to.have.a.property('current');
    expect(state.current).to.have.property('name');
    expect(state.current.name).to.equal('Hasstrup Ezekiel');
  });

  it("Should return the payload after 'TARGET_USER_FETCHED' action ", () => {
    action.type = 'TARGET_USER_FETCHED';
    state = userReducer({}, action);
    expect(state).to.have.a.property('target');
    expect(state.target).to.have.property('name');
    expect(state.target.name).to.equal('Hasstrup Ezekiel');
  });

  it("Should return the payload after 'UPDATE_PERMISSIONS' action ", () => {
    action.type = 'UPDATE_PERMISSIONS';
    action.payload = true;
    state = userReducer({}, action);
    expect(state).to.have.a.property('requiresPermission');
    expect(state.requiresPermission).to.equal(true);
  });
});

