import BaseMiddleware from '../base-middleware';
import UserModelB from '../../models/v1/user';

const AuthMiddleware = new BaseMiddleware();
AuthMiddleware.setModel(UserModelB);
export default AuthMiddleware;
