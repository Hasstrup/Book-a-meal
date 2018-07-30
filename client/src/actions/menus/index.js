import axios from 'axios';
import { config } from '../../helpers/proxy';
import { SomethingWentWrong, PleaseWait } from '../../actionTypes/misc';
import { CatalogueGotten, MenuSelected } from '../../actionTypes/menus/';

/**
 * @returns thunk - an async call that fetches the catalogue from the Server
 * @description - this function should be dispatched by the catalogue component, to try to 
 *                get the list of menus for the day.
 */
export const FetchCatalogue = () => (dispatch) => {
  dispatch(PleaseWait());
  return axios.get(`${config.url}/menus`)
    .then((response) => {
      dispatch(CatalogueGotten(response.data.data));
    })
    .catch((err) => {
      if (!err.response) return dispatch(SomethingWentWrong('Had a problem fetching the menus'))
      dispatch(SomethingWentWrong(err.response.data.error));
    });
};

// remember to edit this next;
export const GetSelectMenu = (id) => (history) => { MenuSelected }
