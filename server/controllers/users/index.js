import BaseController from '../base-controller';
import UserModule from '../../services/users/';

/* eslint radix: 0, no-underscore-dangle: 0 */

let data
class UserControllerBase extends BaseController {
    fetchAll = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        if (!req.populate) {
          data = await UserModule.__fetchAll();
        } else {
          data = await UserModule.__fetchAll('populate');
        }
        this.responseOkay(res, data);
      }, next);
    }

    fetchSingle = (req, res, next) => {
      this.wrapInTryCatch(() => {
        if (req.populate) {
          data = UserModule.__fetchSingle('id', req.params.user_id);
        } else {
          data = UserModule.__fetchSingle('id', req.params.user_id, 'populate');
        }
        this.responseOkay(res, data);
      }, next);
    }

    updateOne = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        const data = await UserModule.updateOne('id', parseInt(req.params.user_id), req.body);
        this.resourceCreated(res, data);
      }, next);
    }

    deleteOne = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        await UserModule.deleteOne('id', parseInt(req.params.user_id));
        this.returnNoContent(res, 'successfully deleted');
      }, next);
    }

    __confirmEmail = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await UserModule.__confirmEmail(req.query.tk);
        this.returnContent(res, data);
      }, next);
    }

    // lfa feedback
    __sendResetPassword = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await UserModule.__sendResetPassword(req.body.email);
        if (data) {
          return this.responseMessageAndData(res, data, 'You have been sent the reset password mail');
        }
      }, next);
    }

    __resetPassword = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await UserModule.__resetPassword(req.query.tk);
        return this.returnContent(res, data);
      }, next);
    }
}

const UserController = new UserControllerBase();

export default UserController;
