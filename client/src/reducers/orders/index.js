export default (state = { cart: [], showCart: false }, action) => {
  switch (action.type) {
    case 'CHANGE_CART_ITEMS':
      return { ...state, cart: action.payload, showCart: true };

    case 'MODIFY_ACTIVITY_MAP':
      return { ...state, showCart: !!action.payload };

    default:
      return state;
  }
};
