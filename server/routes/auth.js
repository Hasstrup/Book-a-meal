import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth/';
import AuthController from '../controllers/auth/';
import ErrorHandler from '../middlewares/error/';
import BaseMiddleware from '../middlewares/base-middleware';

const router = Router();

router.post('/signup', BaseMiddleware.checkForNullInput, AuthMiddleware.checkRequired, AuthController.signUp, ErrorHandler.dispatch);

router.post('/login', BaseMiddleware.checkForNullInput, AuthController.authenticate, ErrorHandler.dispatch);


export default router;
