import axios from 'axios';
import { PleaseWait, NewSignUp, SomethingWentWrong, SpecificUserFetched } from '../../actionTypes/users';
import { CacheHandler, RequestHandler } from '../helpers/';
import config from '../../config';


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
      CacheHandler().setContent(res.data.data, '#user!!@##$');
      CacheHandler().setContent(res.data.data.token, '#token!!#$3');
    })
    .catch((err) => {
      if (!err.response) return; // handle conflicts here;
      dispatch(SomethingWentWrong(err.response.data.error));
    });
};


  /**
   * @name LogInUser
   * @returns {function} Promise that resolves to the data friom the database
   * @description action creator that makes the login call to the database
   * @param {obj} body - body to be sent to the server, must contain the email and the password
   */
export const LogInUser = body => history => (dispatch) => {
  dispatch(PleaseWait());
  return axios.post('http://localhost:3900/api/v1/auth/login', body)
    .then((res) => {
      dispatch(NewSignUp(res.data));
      history.push('/catalogue');
      CacheHandler().setContent(res.data.data, '#user!!@##$');
      CacheHandler().setContent(res.data.data.token, '#token!!#$3');
    })
    .catch((err) => {
      if (!err.response) return dispatch(SomethingWentWrong('Sorry, that did not go through'));
      dispatch(SomethingWentWrong(err.response.data.error));
    });
};


/**
   * @name FetchUser
   * @returns {function} function to be invoked by redux-thunk
   * @description action creator that makes the login call to the database
   * @param {number} id _ The Id of the user to be fetched
*/
export const GetLoggedInUser = () => CacheHandler().getContent('#user!!@##$');


/**
   * @name FetchUser
   * @returns {function} function to be invoked by redux-thunk
   * @description action creator that makes the login call to the database
   * @param {number} id _ The Id of the user to be fetched
*/
export const FetchUser = () => (dispatch, getState) => {
  dispatch(RequestHandler({ method: 'get', url: `${config.url}/users/${getState().users.current.id}` })(user => dispatch(SpecificUserFetched(user))));
};
