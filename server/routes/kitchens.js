import { Router } from 'express';
import BaseMiddleware from '../middlewares/base-middleware';
import KitchenController from '../controllers/kitchen/';
import KitchenMiddleware from '../middlewares/kitchen';
import ErrorHandler from '../middlewares/error/';
import AuthMiddleware from '../middlewares/auth/';

const router = Router();

/* These routes are with base assumptions  of a user
 having a kitchen and the kitchen being the focal point of activity for
 the whole application.
  */

/* this gets all the kitchens in the databases
  if there is the user_id query, the n it gets
  the kitchen of that user
*/
router.get('/', BaseMiddleware.checkPopulateQuery, KitchenController.fetchAll, ErrorHandler.dispatch);

router.get('/:ktid', BaseMiddleware.checkPopulateQuery, AuthMiddleware.checkMasterKey, KitchenMiddleware.checkKitchenParams, KitchenController.fetchSingle, ErrorHandler.dispatch);

/* this checks for the user_id in the query and creates the new kitchen, forbids if there isnt */
router.post('/', BaseMiddleware.checkForNullInput, KitchenMiddleware.checkRequired, BaseMiddleware.checkAuthorization, AuthMiddleware.checkMasterKey, KitchenController.create, ErrorHandler.dispatch);

/* this checks for the user_id in the query and edits the new kitchen, forbids if there isnt */
router.put('/:ktid', BaseMiddleware.checkForNullInput, KitchenMiddleware.checkKitchenParams, BaseMiddleware.checkAuthorization, KitchenMiddleware.revokeAccess, KitchenController.updateOne, ErrorHandler.dispatch);

// this route seeks for the user_id query and then deletes the target if the resource is found
router.delete('/:ktid', KitchenMiddleware.checkKitchenParams, BaseMiddleware.checkAuthorization, KitchenMiddleware.revokeAccess, KitchenController.deleteOne, ErrorHandler.dispatch);

// this route subscribes the user embedded in the uid query params to the kitchen
// router.put('/subscribe/:kithchenid', () => {
//   // edit a new resource
// });

// This gets the subscribers of a particular kitchen belonging to a kitchen;
router.get('/fetch/subscribers', AuthMiddleware.checkMasterKey, BaseMiddleware.checkAuthorization, KitchenMiddleware.checkMasterKey, KitchenMiddleware.restrictAccess, KitchenController.fetchSubscribers, ErrorHandler.dispatch);


export default router;
