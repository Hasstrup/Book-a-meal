/*
    This file contains helper action typed that might be used by all the reducers and all of that
*/

export const PleaseWait = () => ({
  type: 'PLEASE_WAIT'
});

export const DispatchNotification = (message) => {
  setTimeout(CloseNotification, 3000);
  return {
    type: 'NEW_ERROR',
    message
  };
};

export const StartProcess = () => ({
  type: 'START_PROCESS'
});

export const EndProcess = () => ({
  type: 'END_PROCESS'
});


const CloseNotification = () => {
  document.getElementsByClassName('in-app-notifier')[0].style.display = 'none';
};
