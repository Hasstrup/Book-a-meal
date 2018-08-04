

export const NewSignUp = payload => ({
  type: 'NEW_SIGN_IN',
  payload
});

export const PleaseWait = () => ({
  type: 'PLEASE_WAIT'
});

export const SomethingWentWrong = message => ({
  type: 'NEW_ERROR',
  message
});

export const SpecificUserFetched = payload => ({
  type: 'TARGET_USER_FETCHED',
  payload
});
