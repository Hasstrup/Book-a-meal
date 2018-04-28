import BaseMiddleware from '../base-middleware';
import UserModel from '../../models/v1/user';

const AuthMiddleware = new BaseMiddleware()
AuthMiddleware.setModel(UserModel);
export default AuthMiddleware;
