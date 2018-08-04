import { StartProcess, EndProcess, DispatchNotification } from '../../actionTypes/misc';
import uploadImage from '../helpers/cloudinaryProcessor';
import { RequestHandler } from '../helpers';
import config from '../../config';

/**
* @name createNewMeal
* @description - action for creating the new meal - data should contain name, 
description and image to be sent to cloudinary
* @param {obj} data This is the data to be set to the api
* @returns {function} thunk to handled with redux-thunk
*/
const createNewMeal = data => async (dispatch, getState) => {
  dispatch(StartProcess());
  const image = await uploadImage(data.image);
  const successCallback = (meal) => {
    const meals = getState().meals.belongsToUser;
    // shift the meals to the current user's meals so it appears at the top; TODO: PAGINATION
    dispatch({ type: 'NEW_MEAL', payload: [meal, ...meals] });
    dispatch(DispatchNotification('Great job! Successfully uploaded'));
    dispatch(EndProcess());
  };
  dispatch(RequestHandler({ method: 'post', url: `${config.url}/meals`, data: { ...data, image } })(successCallback));
};


export default { createNewMeal };
