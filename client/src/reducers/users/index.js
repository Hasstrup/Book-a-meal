const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_SIGN_IN':
      return { ...state, current: action.payload };

    case 'PLEASE_WAIT':
      // remember to do this for your flash handler
      console.log('Chill out')
    break

    default:
      return state;
  }
};

export default userReducer
