/**
 * @name userReducer
 * @param {object} state the user reducer state
 * @param {object} action the action been progpagated along the event chain
 * @returns {object} the currentState
 */
const userReducer = (state = { requiresPermission: false }, action) => {
  switch (action.type) {
    case 'NEW_SIGN_IN':
      return { ...state, current: action.payload };

    case 'TARGET_USER_FETCHED':
      return { ...state, target: action.payload };

    case 'UPDATE_PERMISSIONS':
      return { ...state, requiresPermission: action.payload };

    default:
      return state;
  }
};

export default userReducer;
