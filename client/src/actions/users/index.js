import axiosInstance, { wrapInTryCatch } from 'axios'
import { PleaseWait, NewSignUp, SomethingWentWrong } from '../../actionTypes/users'

let instance;
let data;

export const SignUpUser = body => history => async (dispatch) => {
  dispatch(PleaseWait());
  instance = axiosInstance();
  data = await wrapInTryCatch(instance.post('/users', body));
  if (data.error) return dispatch(SomethingWentWrong(data.message));
  dispatch(NewSignUp(data));
  history.push('/');
};

export const LogInUser = body => async (dispatch) =>  'ye'
