import BaseService from '../base-service';
import UserModel from '../../models/v1/user';
import models from '../../models/v2/relationship';
import Encrypt from '../../helpers/encrypt';

const { User } = models;

const ref = {};
let data;
const basePath = 'http://localhost:3900/reset/my/password/'

class UserService extends BaseService {
  constructor(model, __model) {
    super();
    this.model = model;
    this.__model = __model;
  }

  fetchAll = (populate) => {
    if (populate && populate === 'populate') {
      return this.model.getAll('populate');
    }
    return this.model.getAll();
  }


  fetchSingle = (key, value, populate) => {
    if (!key || !value || (typeof key) !== 'string') {
      return this.badRequest('please send in a key of type string and a value');
    }
    ref[`${key}`] = value;
    if (populate && populate === 'populate') {
      return this.model.findOne(ref, 'populate');
    }
    return this.model.findOne(ref);
  }


  __resetPassword = async (token) => {
    try {
      if (!token) {
        this.badRequest('Sorry there needs to be a token to proceed');
      }
      let { id, resetPasswordCount } = await Encrypt.decodeToken(token);
      data = await this.__model.findOne({ where: { id } });
      if (data.resetPasswordCount !== resetPasswordCount) {
        return this.badRequest('Sorry this token is expired');
      }
      resetPasswordCount += 1;
      await data.update({ resetPasswordCount });
      return data;
    } catch (e) {
      this.badRequest(e.message);
    }
  }

  __sendResetPassword = async (email) => {
    data = await this.__model.findOne({ where: { email } });
    if (data) {
      // call the mailer service and fire on;
      const tk = await Encrypt.issueToken({ id: data.id });
      const link = `${basePath}?tk=${tk}`;
      return true;
    }
    return this.noPermissions('Sorry we cant find that user');
  }

  __confirmEmail = async (token) => {
    try {
      if (!token) {
        this.badRequest('Sorry there needs to be a token to proceed');
      }
      const { id } = await Encrypt.decodeToken(token);
      data = await this.__model.findOne({ where: { id } });
      const { confirmedEmail } = data;
      if (confirmedEmail) {
        return this.badRequest('Seems like youve confirmed your email prior to now');
      }
      return await data.update({ confirmedEmail: true });
    } catch (e) {
      this.badRequest(e.message);
    }
  }

  __sendConfirmMail = async (id) => {

  }

  /* eslint no-return-await: 0 */
  updateOne = async (key, value, changes) => {
    if (!key || !value || (typeof key) !== 'string' || (typeof changes) !== 'object') {
      return this.badRequest('Please send in the right input values');
    }
    ref[`${key}`] = value;
    return await this.model.findOneAndUpdate(ref, changes);
  }

  deleteOne = async (key, value) => {
    if (!key || !value || (typeof key) !== 'string') {
      return this.badRequest('Please send in the right input values');
    }
    ref[`${key}`] = value;
    return await this.model.findOneAndDelete(ref);
  }
}

const UserServiceObject = new UserService(UserModel, User);

export default UserServiceObject;
