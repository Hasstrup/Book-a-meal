import { expect } from 'chai';
import OrderReducer from '../../reducers/orders';

let state;
const action = {};

describe('Order Reducer', () => {
  it('should return the default state when initializing', () => {
    state = OrderReducer(undefined, action);
    expect(state).to.have.a.property('cart');
    expect(state.cart).to.be.an('array');
    expect(state).to.have.property('showCart');
    expect(state.showCart).to.equal(false);
  });

  it('should change the cart items after the CHANGE_CART_ITEMS action', () => {
    action.type = 'CHANGE_CART_ITEMS';
    action.payload = [{ name: 'MEAL 1' }];
    state = OrderReducer(state, action);
    expect(state.cart.length).to.equal(1);
    expect(state.cart[0].name).to.equal('MEAL 1');
    expect(state.showCart).to.equal(true);
  });

  it('Should change the activity map agter the MODIFY_ACTIVITY_MAP action', () => {
    action.type = 'MODIFY_ACTIVITY_MAP';
    action.payload = false;
    state = OrderReducer(state, action);
    expect(state.showCart).to.equal(false);
  });

  it('should add all the orders belonging to a user after SET ALL ORDERS ACTION', () => {
    action.type = 'SET_ALL_ORDERS';
    action.payload = [{ name: 'MEAL 2' }];
    action.id = 12;
    state = OrderReducer(state, action);
    expect(state).to.have.a.property('allOrders');
    expect(state.allOrders['12']).to.be.an('array');
    expect(state.allOrders['12'][0].name).to.equal('MEAL 2');
  });
});
