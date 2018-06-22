import axios from 'axios';
import { PleaseWait, NewSignUp, SomethingWentWrong } from '../../actionTypes/users';

/**
 *
 *@description curried function that makes a call to the api
               and pushes after the result is returned.
 * @param {*} dispatch - implicitly passed in by redux thunk
 * @param {obj} body - the results from the form in thre index page must contain certin fields.
 * @returns a
 */

export const SignUpUser = body => history => (dispatch) => {
  dispatch(PleaseWait());
  return axios.post('http://localhost:3900/api/v1/auth/signup', body)
    .then((res) => {
      dispatch(NewSignUp(res.data));
      history.push('/catalogue');
    })
    .catch((err) => {
      if (!err.response) return; // handle conflicts here; 
      dispatch(SomethingWentWrong(err.response.data.error));
    });
};

/**
 * @desc action creator that makes the login call to the database
 * @param {obj} body - body to be sent to the server, must contain the email and the password
 */
export const LogInUser = body => history => (dispatch) => {
  dispatch(PleaseWait());
  return axios.post('http://localhost:3900/api/v1/auth/login', body)
    .then((res) => {
      dispatch(NewSignUp(res.data));
      history.push('/catalogue');
    })
    .catch((err) => {
      dispatch(SomethingWentWrong(err.response.data.error));
    });
}
