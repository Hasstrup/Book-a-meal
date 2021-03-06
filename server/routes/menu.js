import { Router } from 'express';
import MenuController from '../controllers/menus/';
import ErrorHandler from '../middlewares/error/';
import BaseMiddleware from '../middlewares/base-middleware';
import MenuMiddleware from '../middlewares/menu';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

/* These routes are written with the following assumptions
  1 a menu has many meal options
  2 a menu belongs to a kitchen(caterer);
  3 a kitchen(caterer) has many menus
*/

/*  get the menu of the day;
  this method checks for the kitchen id query key in the request object
  to determine whether to return all the kitchens in the dbs or the ones belonging
  to the subject kitchen
 */

router.get('/', MenuController.fetchCatalogue, ErrorHandler.dispatch);

router.post('/',  BaseMiddleware.checkAuthorization, MenuMiddleware.__filterAccess, MenuMiddleware.__ensureKitchenOwner, BaseMiddleware.checkForNullInput, MenuMiddleware.__checkRequired, MenuController.setMenuOfTheDay, ErrorHandler.dispatch);

// get a particular menu; should return the
router.get('/:mmid',BaseMiddleware.__checkParams, MenuController.fetchSingle, ErrorHandler.dispatch);


export default router;
