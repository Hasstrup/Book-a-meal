import BaseController from '../base-controller';
import AuthModule from '../../services/auth/auth';
import UserModel from '../../models/v1/user';


let data;
let source;
/* eslint func-names: 0, prefer-destructuring: 0, no-underscore-dangle: 0 */
class AuthControllerClass extends BaseController {
  signUp = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await AuthModule.signUp(req.body);
      data = await this.__knockOffPassword(data)
      this.resourceCreated(res, data);
    }, next);
  }

  authenticate = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await AuthModule.__authenticate(req.body);
      data = await this.__knockOffPassword(data)
      this.returnContent(res, data);
    }, next);
  }

  __knockOffPassword = async (obj) => {
    source = {};
    await Object.entries(obj).forEach((item) => {
      if (item[0] !== 'password') {
        source[`${item[0]}`] = item[1];
      }
    });
    return source;
  }
}

const AuthController = new AuthControllerClass();


export default AuthController;
