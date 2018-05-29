import { isEmail } from 'validator';
import BaseMiddleware from '../base-middleware';
import UserModelB from '../../models/v1/user';

const AuthMiddleware = new BaseMiddleware();
AuthMiddleware.setModel(UserModelB);
AuthMiddleware.checkRequiredLogin = (req, res, next) => {
  if (!req.body.email || req.body.email.constructor !== String || !req.body.password || !isEmail(req.body.email)) {
    const err = new Error('Something is wrong with the input, check the email & password');
    err.status = 422;
    return next(err);
  }
  return next();
}

AuthMiddleware.__revokeAccess = (req, res, next) => {
if (req.user.id !== req.params.user_id) {
    const err = new Error('You do not have permissions to complete this action, Sorry');
    err.status = 401;
    return next(err);
  }
  next();
};

export default AuthMiddleware;
