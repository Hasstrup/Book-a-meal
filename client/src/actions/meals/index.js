import { StartProcess, EndProcess, DispatchNotification } from '../../actionTypes/misc';
import uploadImage from '../helpers/cloudinaryProcessor';
import { RequestHandler } from '../helpers';
import { AllMealsFetchedForUser } from '../../actionTypes/meals';
import config from '../../config';

/**
* @name createNewMeal
* @description - action for creating the new meal - data should contain name,
description and image to be sent to cloudinary
* @param {obj} data This is the data to be set to the api
* @returns {function} thunk to handled with redux-thunk
*/
const createNewMeal = data => hideForm => async (dispatch, getState) => {
  dispatch(StartProcess());
  const image = await uploadImage(data.image);
  const successCallback = (meal) => {
    const meals = getState().meals.belongsToUser;
    // shift the meals to the current user's meals so it appears at the top; TODO: PAGINATION
    dispatch({ type: 'NEW_MEAL', payload: [meal, ...meals] });
    dispatch(DispatchNotification('Great job! Successfully uploaded'));
    dispatch(EndProcess());
    // you should probably hide the meal form after this;
    hideForm();
  };
  dispatch(RequestHandler({ method: 'post', url: `${config.url}/meals`, data: { ...data, image } })(successCallback));
};

/**
* @name fetchAllMealsBelongingToUser
* @description - This action should fetch all the actions belonging to  the current user
* fetches the current user by a call to the getState api
* @returns {function} thunk to handled with redux-thunk which will eventually return an array
*/
const fetchAllMealsBelongingToUser = () => (dispatch, getState) => {
  // redundant to start any process as the user need not know that a request is processing
  // the user hasnt set up a kitchen; hence no meals;
  if (!getState().kitchens.target) return null;
  const request = { method: 'get', url: `${config.url}/meals` };
  dispatch(RequestHandler(request)(meals => dispatch(AllMealsFetchedForUser(meals))));
};

export default { createNewMeal, fetchAllMealsBelongingToUser };
