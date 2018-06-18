const errorReducer = (state = { status: false, message: '' }, action) => {
  if (action.type === 'NEW_ERROR') {
    return { ...state, status: true, message: action.message };
  }
  return state;
};

export default errorReducer;
