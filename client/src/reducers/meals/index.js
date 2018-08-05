const defaultState = { belongsToUser: [] };
/**
 * @description this reducer handles all the meal data in the application
 * @param {object} state - the current state of the application
 * @returns {object} the next state
 * @param {object} action - the action being propagated in the event cycle
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_MEAL':
      return { ...state, belongsToUser: action.payload };

    case 'ALL_MEALS_FETCHED_FOR_USER':
      return { ...state, belongsToUser: action.payload };

    default:
      return state;
  }
};
