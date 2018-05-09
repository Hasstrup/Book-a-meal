import { Router } from 'express';
import BaseMiddleware from '../middlewares/base-middleware';
import KitchenController from '../controllers/kitchen/';
import KitchenMiddleware from '../middlewares/kitchen';
import ErrorHandler from '../middlewares/error/';

/* eslint no-underscore-dangle: 0 */
const router = Router();

router.get('/', BaseMiddleware.checkPopulateQuery, KitchenController.fetchAll, ErrorHandler.dispatch);

router.get('/:ktid', BaseMiddleware.checkPopulateQuery, KitchenMiddleware.checkKitchenParams, KitchenController.fetchSingle, ErrorHandler.dispatch);

router.post('/', BaseMiddleware.checkForNullInput, KitchenMiddleware.checkRequired, BaseMiddleware.checkAuthorization, KitchenMiddleware.__filterAccess, KitchenController.create, ErrorHandler.dispatch);

router.put('/:ktid', BaseMiddleware.checkForNullInput, KitchenMiddleware.checkKitchenParams, BaseMiddleware.checkAuthorization, KitchenMiddleware.__filterAccess, KitchenMiddleware.__revokeAccess, KitchenController.updateOne, ErrorHandler.dispatch);

router.delete('/:ktid', KitchenMiddleware.checkKitchenParams, BaseMiddleware.checkAuthorization, KitchenMiddleware.__filterAccess, KitchenMiddleware.__revokeAccess, KitchenController.deleteOne, ErrorHandler.dispatch);


export default router;
