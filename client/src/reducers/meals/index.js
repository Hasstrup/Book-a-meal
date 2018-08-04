const defaultState = { belongsToUser: [] };
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_MEAL':
      return { ...state, belongsToUser: action.payload };

    default:
      return state;
  }
};
