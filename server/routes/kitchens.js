import { Router } from 'express';
import BaseMiddleware from '../middlewares/base-middleware';
import KitchenController from '../controllers/kitchen/';
import KitchenMiddleware from '../middlewares/kitchen';
import ErrorHandler from '../middlewares/error/';

/* eslint no-underscore-dangle: 0 */
const router = Router();

router.get('/', BaseMiddleware.checkPopulateQuery, KitchenController.fetchAll, ErrorHandler.dispatch);

router.get('/:ktid', BaseMiddleware.checkPopulateQuery, BaseMiddleware.__checkParams, KitchenController.fetchSingle, ErrorHandler.dispatch);

router.post('/', BaseMiddleware.checkAuthorization, KitchenMiddleware.__filterAccess, BaseMiddleware.checkForNullInput, KitchenMiddleware.checkRequired, KitchenController.create, ErrorHandler.dispatch);

router.put('/:ktid', BaseMiddleware.checkAuthorization, KitchenMiddleware.__filterAccess, BaseMiddleware.__checkParams, KitchenMiddleware.__revokeAccess, BaseMiddleware.checkForNullInput, KitchenController.updateOne, ErrorHandler.dispatch);

router.delete('/:ktid', BaseMiddleware.checkAuthorization, KitchenMiddleware.__filterAccess, BaseMiddleware.__checkParams, KitchenMiddleware.__revokeAccess, KitchenController.deleteOne, ErrorHandler.dispatch);


export default router;
