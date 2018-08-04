
/**
* @name errorReducer
* @description - Reducer for handling the errors to the database
* @param {obj} state  The default state of the application
* @param {obj} action action propagated along the event cycle
* @returns {obj} defaultState || newState
*/export default (state = { status: false, message: '' }, action) => {
  if (action.type === 'NEW_ERROR') return { ...state, status: true, message: action.message };
  if (action.type === 'CLOSE_ERROR') return { ...state, status: false, message: action.message };
  if (action.type === 'START_PROCESS') return { ...state, processing: true };
  if (action.type === 'END_PROCESS') return { ...state, processing: false };
  return state;
};

