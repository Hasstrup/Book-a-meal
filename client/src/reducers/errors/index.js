const errorReducer = (state = { status: false, message: '' }, action) => {
  if (action.type === 'NEW_ERROR') return { ...state, status: true, message: action.message };
  if (action.type === 'START_PROCESS') return { ...state, processing: true };
  if (action.type === 'END_PROCESS') return { ...state, processing: false };
  return state;
};

export default errorReducer;
