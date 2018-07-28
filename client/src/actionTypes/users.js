

export const NewSignUp = (payload) => {
  return {
    type: 'NEW_SIGN_IN',
    payload
  };
};

export const PleaseWait = () => {
  return {
    type: 'PLEASE_WAIT'
  }
}

export const SomethingWentWrong = (message) => {
  return {
    type: 'NEW_ERROR',
    message
  }
}
