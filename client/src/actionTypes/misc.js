/*
    This file contains helper action typed that might be used by all the reducers and all of that
*/

export const PleaseWait = () => ({
  type: 'PLEASE_WAIT'
});

export const DispatchNotification = message => ({
  type: 'NEW_ERROR',
  message
});

export const StartProcess = () => ({
  type: 'START_PROCESS'
});

export const EndProcess = () => ({
  type: 'END_PROCESS'
});
