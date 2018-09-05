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
