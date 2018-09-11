/**
 * @name KitchenReducer
 * @param {object} state - the current state of the reducer
 * @param {object} action - the action being propagated the evnt chain
 * @returns {object}
 */
export default (state = {}, action) => {
  if (action.type === 'TARGET_KITCHEN_FETCHED') return { ...state, target: action.payload };
  return state;
};
