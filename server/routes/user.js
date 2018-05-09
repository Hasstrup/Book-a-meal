import { Router } from 'express';
import UserController from '../controllers/users/';
import BaseMiddleware from '../middlewares/base-middleware';
import AuthMiddleware from '../middlewares/auth/';
import ErrorHandler from '../middlewares/error/';

const router = Router();

/* Simple crud for users, The create functionality is wrapped into the auth module in ./auth.js */

/* eslint no-underscore-dangle: 0 */
router.get('/', BaseMiddleware.checkPopulateQuery, UserController.fetchAll);

router.get('/:user_id', BaseMiddleware.checkPopulateQuery, UserController.fetchSingle);

router.get('/confirm/mail', AuthMiddleware.checkForTokenQuery, UserController.__confirmEmail, ErrorHandler.dispatch);

router.post('/send/reset/password', BaseMiddleware.checkForEmail, UserController.__sendResetPassword, ErrorHandler.dispatch);

router.get('/reset/password', AuthMiddleware.checkForTokenQuery, UserController.__resetPassword, ErrorHandler.dispatch);

router.put('/:user_id', BaseMiddleware.checkAuthorization, BaseMiddleware.revokeAccess, UserController.updateOne, ErrorHandler.dispatch);

router.delete('/:user_id', BaseMiddleware.checkAuthorization, BaseMiddleware.revokeAccess, UserController.deleteOne, ErrorHandler.dispatch);


export default router;
