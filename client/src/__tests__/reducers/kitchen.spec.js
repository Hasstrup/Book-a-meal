import { expect } from 'chai';
import KitchenReducer from '../../reducers/kitchens';

let state;
const action = {};

describe('Kitchen Reducer', () => {
  it('should return the default state of the reducer', () => {
    state = KitchenReducer(undefined, {});
    expect(state).to.be.an('object');
  });

  it('Should change the target kicthen after the TARGET_KITCHEN_FETCHED action', () => {
    action.type = 'TARGET_KITCHEN_FETCHED';
    action.payload = { name: 'Kitchen 1' };
    state = KitchenReducer(state, action);
    expect(state).to.have.a.property('target');
    expect(state.target.name).to.equal('Kitchen 1');
  });
});
