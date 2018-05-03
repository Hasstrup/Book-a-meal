import { Router } from 'express';
import UserController from '../controllers/users/';
import BaseMiddleware from '../middlewares/base-middleware';
import ErrorHandler from '../middlewares/error/';

const router = Router();

/* Simple crud for users, The create functionality is wrapped into the auth module in ./auth.js */

router.get('/', BaseMiddleware.checkPopulateQuery, UserController.fetchAll);

router.get('/:user_id', BaseMiddleware.checkPopulateQuery, UserController.fetchSingle);

router.put('/:user_id', BaseMiddleware.checkAuthorization, BaseMiddleware.revokeAccess, UserController.updateOne, ErrorHandler.dispatch);

router.delete('/:user_id', BaseMiddleware.checkAuthorization, BaseMiddleware.revokeAccess, UserController.deleteOne, ErrorHandler.dispatch);


export default router;
