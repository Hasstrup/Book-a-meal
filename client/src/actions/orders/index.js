import { CartOps, generateKey } from '../ops';

const AddToCart = (key = generateKey()) => meal => dispatch => dispatch({ type: 'CHANGE_CART_ITEMS', payload: CartOps(key)(meal)({ add: true }) });
const RemoveFromCart = (key = generateKey()) => meal => dispatch => dispatch({ type: 'CHANGE_CART_ITEMS', payload: CartOps(key)(meal)({ remove: true }) });

export {
  AddToCart,
  RemoveFromCart
};
