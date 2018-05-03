import BaseController from '../base-controller';
import UserModule from '../../services/users/';

/* eslint radix: 0 */
class UserControllerBase extends BaseController {
    fetchAll = (req, res, next) => {
      this.wrapInTryCatch(() => {
        let data;
        if (!req.populate) {
          data = UserModule.fetchAll();
        } else {
          data = UserModule.fetchAll('populate');
        }
        this.responseOkay(res, data);
      }, next);
    }

    fetchSingle = (req, res, next) => {
      this.wrapInTryCatch(() => {
        let data;
        if (req.populate) {
          data = UserModule.fetchSingle('id', parseInt(req.params.user_id));
        } else {
          data = UserModule.fetchSingle('id', parseInt(req.params.user_id), 'populate');
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
}

const UserController = new UserControllerBase();

export default UserController;
