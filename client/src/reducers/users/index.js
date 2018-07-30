const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_SIGN_IN':
      return { ...state, current: action.payload };

    case 'TARGET_USER_FETCHED':
      return { ...state, target: action.payload };

    default:
      return state;
  }
};

export default userReducer;
