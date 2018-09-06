import config from '../../config';
import { DispatchNotification, StartProcess, EndProcess } from '../../actionTypes/misc';
import { RequestHandler } from '../helpers/index';
import { CatalogueGotten } from '../../actionTypes/menus/';

/**
 * @returns {function} thunk - an async call that fetches the catalogue from the Server
 * @description - this function should be dispatched by the catalogue component, to try to
 *                get the list of menus for the day.
 */
export const FetchCatalogue = () => (dispatch) => {
  dispatch(StartProcess());
  const request = { method: 'get', url: `${config.url}/menus` };
  const successCallBack = (menus) => {
    dispatch(CatalogueGotten(menus));
    dispatch(EndProcess());
  };
  return dispatch(RequestHandler(request)(successCallBack));
};

/**
 *
 * @param {Object} data - the meal object to be sent to the db
 * @returns {function}
 * @name SetMenuOfTheDay
 * @description This helps create the menu of the day for the current
 * kitchen in session
 */
export const SetMenuOfTheDay = data => (dispatch, getState) => {
  dispatch(StartProcess());
  const request = { method: 'post', url: `${config.url}/menus`, data };
  const successCallBack = (menu) => {
    dispatch({ type: 'MENU_OF_THE_DAY', payload: menu });
    dispatch(EndProcess());
    // let the user know this went through successfully!
    dispatch(DispatchNotification(`${menu.name} is now set as the menu of the day for ${getState().kitchens.target.name}`));
  };
  return dispatch(RequestHandler(request)(successCallBack));
};

/**
 * @name fetchMenuOfTheDayOfUser
 * @returns {null}
 * @description this fetches the menu of the day belonging to the current user
 * depending on the presence of a kitchen;
 *
 */
export const fetchMenuOfTheDayOfUser = () => (dispatch, getState) => {
  if (!getState().kitchens.target) return;
  const request = { method: 'get', url: `${config.url}/kitchens/${getState().kitchens.target.id}?populate=populate` };
  const successCallBack = (kitchen) => {
    // since the payload of doesnt populate the ofTheDay; TODO: make this server side;
    const payload = kitchen.Menus.filter(item => item.id === kitchen.ofTheDay)[0];
    dispatch({ type: 'MENU_OF_THE_DAY', payload });
  };
  dispatch(RequestHandler(request)(successCallBack));
};

// remember to edit this next;
export const FetchSpecificMenu = id => history => callback => (dispatch) => {
  dispatch(StartProcess());
  const request = { method: 'get', url: `${config.url}/menus/${id}` };
  const success = (menu) => {
    dispatch(EndProcess());
    dispatch({ type: 'TARGET_MENU_FETCHED', payload: menu });
    if (callback) return callback(menu);
    history.push(`/menu/${id}`);
  };
  dispatch(RequestHandler(request)(success));
};
