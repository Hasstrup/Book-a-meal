import axios from 'axios';
import { config } from '../../helpers/proxy';
import { DispatchNotification, StartProcess, EndProcess } from '../../actionTypes/misc';
import { RequestHandler } from '../helpers/index';
import { CatalogueGotten, MenuSelected } from '../../actionTypes/menus/';

/**
 * @returns {function} thunk - an async call that fetches the catalogue from the Server
 * @description - this function should be dispatched by the catalogue component, to try to 
 *                get the list of menus for the day.
 */
export const FetchCatalogue = () => (dispatch) => {
  dispatch(StartProcess());
  return axios.get(`${config.url}/menus`)
    .then((response) => {
      dispatch(CatalogueGotten(response.data.data));
      dispatch(EndProcess());
    })
    .catch((err) => {
      dispatch(EndProcess());
      if (!err.response) return dispatch(DispatchNotification('Had a problem fetching the menus'))
      dispatch(DispatchNotification(err.response.data.error));
    });
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


export const fetchMenuOfTheDayOfUser = () => (dispatch, getState) => {
  if (!getState().kitchens.target) return;
  const request = { method: 'get', url: `${config.url}/kitchens/${getState().kitchens.target.id}?populate=populate` };
  const successCallBack = (kitchen) => {
    dispatch({ type: 'MENU_OF_THE_DAY', payload: kitchen.ofTheDay });
  };
  dispatch(RequestHandler(request)(successCallBack));
};

// remember to edit this next;
export const GetSelectMenu = (id) => (history) => { MenuSelected };
