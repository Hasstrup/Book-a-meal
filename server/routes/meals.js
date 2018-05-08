import { Router } from 'express';
import BaseMiddleware from '../middlewares/base-middleware';
import MealMiddleware from '../middlewares/meals/';
import KitchenMiddleware from '../middlewares/kitchen';
import MealController from '../controllers/meals/';
import ErrorHandler from '../middlewares/error';


const router = Router();

/* get all the menus in the directory
  check if there is a kitchen querystring to return
  all the meals of a kitchen
*/

/* get a particular meal */
router.get('/', BaseMiddleware.checkAuthorization, MealMiddleware.__filterAccess, MealMiddleware.__ensureKitchenOwner, MealController.fetchMealsForKitchen, ErrorHandler.dispatch);

router.get('/:mealId', MealMiddleware.checkRequiredParams, MealController.fetchSingle, ErrorHandler.dispatch);

/* check the query string for kitchen and create the new meal, reject if none */
router.post('/', BaseMiddleware.checkForNullInput, MealMiddleware.checkRequired, BaseMiddleware.checkAuthorization, MealMiddleware.__filterAccess, MealMiddleware.__ensureKitchenOwner, MealController.create, ErrorHandler.dispatch);


router.put('/:mealId', BaseMiddleware.checkForNullInput, BaseMiddleware.checkAuthorization, MealMiddleware.__filterAccess, MealMiddleware.__ensureKitchenOwner, MealMiddleware.__revokeAccess, MealController.updateContent, ErrorHandler.dispatch);

/* check the request for the kitchen query, reject request
if null or it doesnt match the owner of the item */
router.delete('/:mealId', BaseMiddleware.checkAuthorization,  MealMiddleware.__filterAccess, MealMiddleware.__ensureKitchenOwner, MealMiddleware.__revokeAccess, MealController.deleteContent, ErrorHandler.dispatch);


export default router;
