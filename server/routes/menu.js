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

router.get('/catalogue', MenuController.fetchCatalogue, ErrorHandler.dispatch);

/* the kitchen id is absolutely important and
will forbid if there isnt one */
router.post('/', BaseMiddleware.checkForNullInput, BaseMiddleware.checkAuthorization, AuthMiddleware.checkMasterKey, MenuMiddleware.revokeAccess, MenuController.setMenuOfTheDay, ErrorHandler.dispatch);

// get a particular menu; should return the
router.get('/:mmid', MenuMiddleware.checkRequiredParams, MenuController.fetchSingle, ErrorHandler.dispatch);


export default router;
