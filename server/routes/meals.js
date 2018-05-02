import { Router } from 'express';
import BaseMiddleware from '../middlewares/base-middleware';
import MealMiddleware from '../middlewares/meals/';
import KitchenMiddleware from '../middlewares/kitchen'
import MealController from '../controllers/meals/';
import ErrorHandler from '../middlewares/error';


const router = Router();

/* get all the menus in the directory
  check if there is a kitchen querystring to return
  all the meals of a kitchen
*/

/* get a particular meal */
router.get('/:mealId', MealMiddleware.checkRequiredParams, MealController.fetchSingle, ErrorHandler.dispatch);

/* check the query string for kitchen and create the new meal, reject if none */
router.post('/:ktid', BaseMiddleware.checkForNullInput, BaseMiddleware.checkAuthorization, KitchenMiddleware.checkKitchenParams, MealMiddleware.restrictAccess, MealController.create, ErrorHandler.dispatch );

/* edit the subject meal id, check the req.query and forbid if there is no kitchen or the kitchen
  is not the owner of the menu;
*/
router.put('/:mealId', () => {
  // edit a new resource,
});

/* check the request for the kitchen query, reject request
if null or it doesnt match the owner of the item */
router.delete('/:mealId', () => {
  // call the necessary controller
});


export default router;
