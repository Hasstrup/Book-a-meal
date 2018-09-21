import { expect } from 'chai';
import MealReducer from '../../reducers/meals';

let state;
const action = {};

describe('Meal Reducer', () => {
  it('should return the default state of the reducer', () => {
    state = MealReducer(undefined, {});
    expect(state).to.be.an('object');
    expect(state.belongsToUser).to.be.an('array');
  });

  it('should add a new meal to the belongsToUser filed after a NEW_MEAL action', () => {
    action.type = 'NEW_MEAL';
    action.payload = [{ name: 'MENU 1' }];
    state = MealReducer(state, action);
    expect(state).to.have.a.property('belongsToUser');
    expect(state.belongsToUser[0].name).to.equal('MENU 1');
  });

  it('Should populate the meals belonging to a user after ALL_MEALS_FETCHED_FOR_USER', () => {
    action.type = 'ALL_MEALS_FETCHED_FOR_USER';
    action.payload = [{ name: 'MENU 2' }];
    state = MealReducer(state, action);
    expect(state).to.have.a.property('belongsToUser');
    expect(state.belongsToUser[0].name).to.equal('MENU 2');
  });
});
