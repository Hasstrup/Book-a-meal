import { expect } from 'chai';
import MenuReducer from '../../reducers/menus';

let state;
const action = {};

describe('Menu Reducer', () => {
  it('should return the default state of the reducer', () => {
    state = MenuReducer(undefined, {});
    expect(state).to.be.an('object');
  });

  it('Should change the catalogue after a CATALOGUE_FETCHED action', () => {
    action.type = 'CATALOGUE_FETCHED';
    action.payload = [{ name: 'MENU 1' }];
    state = MenuReducer(state, action);
    expect(state).to.have.a.property('catalog');
    expect(state.catalog[0]).to.have.property('name');
    expect(state.catalog[0].name).to.equal('MENU 1');
  });

  it('Should change target menu after the TARGET_MENU_FETCHED action', () => {
    action.type = 'TARGET_MENU_FETCHED';
    action.payload = { name: 'MENU 1' };
    state = MenuReducer(state, action);
    expect(state).to.have.a.property('target');
    expect(state.target.name).to.equal('MENU 1');
  });

  it('Should change the Menu of the day after the MENU OF THE DAY ACTION', () => {
    action.type = 'MENU_OF_THE_DAY';
    action.payload = { name: 'MENU OF THE DAY 1' };
    state = MenuReducer(state, action);
    expect(state).to.have.property('ofTheDay');
    expect(state.ofTheDay.name).to.equal('MENU OF THE DAY 1');
  });
});
