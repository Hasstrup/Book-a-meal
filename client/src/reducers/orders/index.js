const ref = {};

/**
 * @name OrderReducer
 * @param {object} state the current state of the reducer
 * @param {object} action the action being propagated along the event cycle;
 * @returns {object} the current state of the application
 */
export default (state = { cart: [], showCart: false }, action) => {
  switch (action.type) {
    case 'CHANGE_CART_ITEMS':
      return { ...state, cart: action.payload, showCart: true };

    case 'MODIFY_ACTIVITY_MAP':
      return { ...state, showCart: !!action.payload };

    case 'SET_ALL_ORDERS':
      ref[`${action.id}`] = action.payload;
      return { ...state, allOrders: { ...state.allOrders, ...ref } };

    default:
      return state;
  }
};
