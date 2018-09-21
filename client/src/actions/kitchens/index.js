import { RequestHandler } from '../helpers';
import { DispatchNotification, StartProcess, EndProcess } from '../../actionTypes/misc';
import { TargetKitchenRetrieved } from '../../actionTypes/kitchens';
import config from '../../config';


/**
 * @name SetUpNewKitchen
 * @param {*} data the new kitchen object
 * @description this function sets up a new kitchen for the current user
 * @returns {null}
 */
const SetUpNewKitchen = data => (dispatch, getState) => {
  dispatch(StartProcess());
  if (!data.description || !data.name) return dispatch(DispatchNotification('Please pass in the correct name and description'));
  // TODO: Refactor this ting
  const successCallback = (kitchen) => {
    // Hide the kitchen && the navigator
    document.getElementsByClassName('new-kitchen')[0].style.display = 'none';
    dispatch(EndProcess());
    dispatch(TargetKitchenRetrieved(kitchen));
    dispatch(DispatchNotification(`Awesome ${getState().users.current.firstname}!, now you can start sharing your meals`));
  };
  return dispatch(RequestHandler({ method: 'post', url: `${config.url}/kitchens`, data })(successCallback));
};

export default { SetUpNewKitchen };
