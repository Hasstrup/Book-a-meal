import { expect } from 'chai';
import HelperReducer from '../../reducers/funcs';

let state;
const action = {};

describe('Helper functions reducer', () => {
  it('should return the default state of the reducer', () => {
    state = HelperReducer(undefined, {});
    expect(state).to.be.an('object');
    expect(state.pending).to.equal(false);
  });

  it('Should update the state with a new pending function after the NEW_PENDING_FUNCTION', () => {
    action.type = 'NEW_PENDING_FUNCTION';
    action.payload = [{ name: 'FUNCTION 1' }];
    state = HelperReducer(state, action);
    expect(state.pending[0].name).to.equal('FUNCTION 1');
  });

  it('Should clear all the pending functions after ', () => {
    action.type = 'CLEAR_PENDING';
    state = HelperReducer(state, action);
    expect(state.pending).to.equal(false);
  });
});
