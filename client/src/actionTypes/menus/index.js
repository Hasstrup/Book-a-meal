/**
 *
 * @param {array} payload - an array of menus from a call to the API
 * @returns {object} action - an object that should be listened to by the reducer
 * @description this action creator will be called when the call to fetch all the menus of the 
 *              day from the api has returned successfully
 *
 */
export const CatalogueGotten = (payload) => {
  return {
    type: 'CATALOGUE_FETCHED',
    payload
  };
};

/**
 *
 * @param {array} payload - an array of menus from a call to the API
 * @returns {object} action - an object that should be listened to by the reducer
 * @description this action should be dispatched when a user clicks an menu in the catalogue.
 */
export const MenuSelected = (payload) => {
  return {
    type: 'MENU_SELECTED',
    payload
  };
};
