/**
 * @name funcReducer
 * @param {*} state the current state of the application
 * @param {*} action the action being propagated in the event cycle
 * @returns {object} the current state of the application;
 */
const funcReducer = (state = { pending: false }, action) => {
  switch (action.type) {
    case 'NEW_PENDING_FUNCTION':
      return { ...state, pending: action.payload };

    case 'CLEAR_PENDING':
      return { ...state, pending: false };

    default:
      return state;
  }
};

export default funcReducer;
