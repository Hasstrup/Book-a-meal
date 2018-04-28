import BaseController from '../base-controller';
import AuthModule from '../../services/auth/auth';
import UserModel from '../../models/v1/user';

const Authenticator = new AuthModule(UserModel);

let data;
/* eslint func-names: 0 */
class AuthControllerClass extends BaseController {
  signUp = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await Authenticator.signUp(req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  authenticate = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      await Authenticator.authenticate(req.body);
      this.responseOkay(res, 'successful authentication');
    }, next);
  }
}

const AuthController = new AuthControllerClass();


export default AuthController;
