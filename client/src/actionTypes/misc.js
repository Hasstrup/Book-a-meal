/*
    This file contains helper action typed that might be used by all the reducers and all of that
*/

export const PleaseWait = () => {
  return {
    type: 'PLEASE_WAIT'
  };
};

export const SomethingWentWrong = (message) => {
  return {
    type: 'NEW_ERROR',
    message
  };
};
