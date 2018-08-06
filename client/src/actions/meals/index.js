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
  try {
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
  } catch (err) {
    dispatch(EndProcess());
    dispatch(DispatchNotification(`Something went wrong ${getState().users.current.firstname} :(, Try again`));
  }
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


/**
* @name editMealInformation
* @param {string} id the id of the meal to be updated
* @param {object} changes an object containing the changes to be made
* @description - This action edits relevant information about a meal, it then replaces the now
* updated meal in the store on success
* @returns {function} thunk to handled with redux-thunk which will eventually return an array
*/
export const editMealInformation = id => changes => (dispatch, getState) => {
  dispatch(StartProcess());
  const successCallBack = (meal) => {
    // you'll do your filtering here
    const meals = getState().meals.belongsToUser;
    const index = meals.map(item => item.id).indexOf(meal.id);
    meals[index] = meal;
    dispatch(AllMealsFetchedForUser(meals));
    dispatch(EndProcess());
    dispatch(DispatchNotification('Awesome, that was edited successfully'));
  };
  const request = { method: 'put', url: `${config.url}/meals/${id}`, data: changes };
  dispatch(RequestHandler(request)(successCallBack));
};

/**
 * @name deleteMeal
 * @param {*} id The meal that is going to be deleted
 * @description this action deletes a meal from the database
 * @returns {function} thunk to be reduced to an action
 */
export const deleteMeal = id => (dispatch, getState) => {
  dispatch(StartProcess());
  const successCallBack = () => {
    const meals = getState().meals.belongsToUser.filter(item => item.id !== id);
    dispatch(AllMealsFetchedForUser(meals));
    dispatch(EndProcess());
  };
  dispatch(RequestHandler({ method: 'delete', url: `${config.url}/meals/${id}` })(successCallBack));
};

export default {
 createNewMeal, fetchAllMealsBelongingToUser, editMealInformation, deleteMeal 
};

