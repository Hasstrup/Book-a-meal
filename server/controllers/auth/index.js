import BaseController from '../base-controller';
import AuthModule from '../../services/auth/auth';
import UserModel from '../../models/v1/user';


let data;
/* eslint func-names: 0 */
class AuthControllerClass extends BaseController {
  signUp = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await AuthModule.signUp(req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  authenticate = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      await AuthModule.authenticate(req.body);
      this.responseOkay(res, 'successful authentication');
    }, next);
  }
}

const AuthController = new AuthControllerClass();


export default AuthController;
