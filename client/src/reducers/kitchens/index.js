export default (state = {}, action) => {
  if (action.type === 'TARGET_KITCHEN_FETCHED') return { ...state, target: action.payload };
  return state;
};
