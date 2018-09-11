/*
    This file contains helper action typed that might be used by all the reducers and all of that
*/

import store from '../../store';

// TODO: is there a more idiomatic way to do this without using a toast library
const CloseNotification = () => {
  store.dispatch({ type: 'CLOSE_ERROR' });
};


export const PleaseWait = () => ({
  type: 'PLEASE_WAIT'
});

export const DispatchNotification = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    setTimeout(CloseNotification, 3000);
  }
  return {
    type: 'NEW_ERROR',
    message
  };
};

export const RequiresPermission = () => ({
  type: 'UPDATE_PERMISSIONS',
  payload: true
});

export const ResolvePermission = () => ({
  type: 'UPDATE_PERMISSIONS'
});

export const StartProcess = () => ({
  type: 'START_PROCESS'
});

export const EndProcess = () => ({
  type: 'END_PROCESS'
});
