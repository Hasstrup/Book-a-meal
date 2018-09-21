import { expect } from 'chai';
import ErrorReducer from '../../reducers/errors';

let state;
const action = {};

describe('Error Reducer', () => {
  it('should return the default state of the reducer', () => {
    state = ErrorReducer(undefined, {});
    expect(state).to.be.an('object');
    expect(state.status).to.equal(false);
    expect(state.message).to.equal('');
  });

  it('should show an error after NEW_ERROR after the error reducer', () => {
    action.type = 'NEW_ERROR';
    state = ErrorReducer(state, action);
    expect(state.status).to.equal(true);
  });

  it('should dismiss an error after CLOSE_ERROR after the error reducer', () => {
    action.type = 'CLOSE_ERROR';
    state = ErrorReducer(state, action);
    expect(state.status).to.equal(false);
  });
  it('should toggle on processing after the START_PROCESS action', () => {
    action.type = 'START_PROCESS';
    state = ErrorReducer(state, action);
    expect(state.processing).to.equal(true);
  });

  it('should toggle off processing after the END_PROCESS action', () => {
    action.type = 'END_PROCESS';
    state = ErrorReducer(state, action);
    expect(state.processing).to.equal(false);
  });
});
