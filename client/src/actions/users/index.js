import axios from 'axios';
import { NewSignUp, SpecificUserFetched } from '../../actionTypes/users';
import { DispatchNotification, StartProcess, EndProcess } from '../../actionTypes/misc';
import { fetchMenuOfTheDayOfUser } from '../../actions/menus';
import { TargetKitchenRetrieved } from '../../actionTypes/kitchens';
import MealActions from '../meals';
import { CartOps } from '../ops/';
import { CacheHandler, RequestHandler } from '../helpers';
import config from '../../config';

const { fetchAllMealsBelongingToUser } = MealActions;

/**
 *
 *@description curried function that makes a call to the api
               and pushes after the result is returned.
 * @param {*} dispatch - implicitly passed in by redux thunk
 * @param {obj} body - the results from the form in thre index page must contain certin fields.
 * @returns a
 */

export const SignUpUser = body => history => (dispatch, getState) => {
  dispatch(StartProcess());
  return axios.post(`${config.url}/auth/signup`, body)
    .then((res) => {
      dispatch(NewSignUp(res.data.data));
      dispatch(EndProcess());
      CacheHandler().setContent(res.data.data, '#user!!@##$');
      CacheHandler().setContent(res.data.data.token, '#token!!#$3');
      if (getState().funcs && getState().funcs.pending) return getState().funcs.pending();
      history.push('/catalogue');
      process.env.NODE_ENV !== 'test' && window.location.reload();
      dispatch(DispatchNotification(`Welcome to Book A Meal ${res.data.data.firstname}. I'm jarvis, here to help :)`));
      // only dispatch if the user has a kitchen
    })
    .catch((err) => {
      dispatch(EndProcess());
      if (!err.response) return dispatch(DispatchNotification('Sorry that did not go through')); // handle conflicts here;
      dispatch(DispatchNotification(err.response.data.error));
    });
};


  /**
   * @name LogInUser
   * @returns {function} Promise that resolves to the data friom the database
   * @description action creator that makes the login call to the database
   * @param {obj} body - body to be sent to the server, must contain the email and the password
   */
export const LogInUser = body => history => (dispatch, getState) => {
  dispatch(StartProcess());
  return axios.post(`${config.url}/auth/login`, body)
    .then((res) => {
      dispatch(NewSignUp(res.data));
      if (res.data.data.kitchen && res.data.data.kitchen.name) dispatch(TargetKitchenRetrieved(res.data.data.kitchen));
      dispatch(EndProcess());
      CacheHandler().setContent(res.data.data.token, '#token!!#$3');
      CacheHandler().setContent(res.data.data, '#user!!@##$');
      if (getState().funcs && getState().funcs.pending) return getState().funcs.pending();
      history.push('/catalogue');
      process.env.NODE_ENV !== 'test' && window.location.reload();
    })
    .catch((err) => {
      dispatch(EndProcess());
      if (!err.response) return dispatch(DispatchNotification('Sorry, that did not go through'));
      dispatch(DispatchNotification(err.response.data.error));
    });
};

export const LogOutUser = (history) => {
  localStorage.removeItem('#token!!#$3');
  localStorage.removeItem('#user!!@##$');
  CartOps()()({ clear: true });
  history.push('/');
  window.location.reload();
};


/**
   * @name GetLoggedInUser
   * @returns {function} function to be invoked by redux-thunk
   * @description action creator that makes the login call to the database
   * @param {number} id _ The Id of the user to be fetched
*/
export const GetLoggedInUser = () => CacheHandler().getContent('#user!!@##$');


/**
   * @name FetchUser
   * @returns {function} function to be invoked by redux-thunk
   * @description This function is called every time the application mounts;
   * it tries to immediately fetch every data for the user and bootstrap the application
   * @param {number} id _ The Id of the user to be fetched
*/
export const FetchUser = () => (dispatch, getState) => {
  const callBack = (user) => {
    dispatch(SpecificUserFetched(user));
    if (user.kitchen && user.kitchen.name) {
      dispatch(TargetKitchenRetrieved(user.kitchen));
      dispatch(fetchMenuOfTheDayOfUser());
      return dispatch(fetchAllMealsBelongingToUser()); // should work after the Kitchen is set up
    }
  };
  return dispatch(RequestHandler({ method: 'get', url: `${config.url}/users/${getState().users.current.id}` })(callBack));
};
