import axios from 'axios';
import { StartProcess, EndProcess } from '../../actionTypes/misc';
import { RequestHandler } from '../helpers';
import config from '../../config';

const createNewMeal = data => (dispatch, getState) => {
  dispatch(StartProcess());
  const succesCallback = (meal) => {
    const meals = getState().meals.belongsToUser();
    // shift the meals to the current user's meals; TODO: PAGINATION
    dispatch({ type: 'NEW_MEAL', payload: [meal, ...meals] });
    dispatch(EndProcess());
  };
  dispatch(RequestHandler({ method: 'post', url: `${config.url}/meals`, data })(succesCallback))
};


export { createNewMeal };
