const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_SIGN_IN':
      return { ...state, current: action.payload };

    case 'PLEASE_WAIT':
      return { ...state, processing: true };

    default:
      return state;
  }
};

export default userReducer
