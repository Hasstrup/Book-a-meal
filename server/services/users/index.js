import BaseService from '../base-service';
import UserModel from '../../models/v1/user';
import models from '../../models/v2/relationship';
import Encrypt from '../../helpers/encrypt';
import mailers from '../../helpers/mailers/'

const { dispatch } = mailers

const { User } = models;

let subject;
let message;
let destination;

const ref = {};
let data;
const basePath = 'http://localhost:3900/api/v1/users/reset/password/';
const confirmMailPath = 'http://localhost:3900/api/v1/users/confirm/mail'

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
      const tk = await Encrypt.issueToken({ id: data.id, resetPasswordCount: data.resetPasswordCount });
      const link = `${basePath}?tk=${tk}`;
      message = `<h2> Hello, Yes we understand </br> Please click this link to reset your password <br /> ${link} </h2>`;
      subject = 'Reset Password';
      destination = email;
      const body = { message, destination, subject };
      dispatch(body);
      return tk;
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

  __sendConfirmMail = async (id, email) => {
    const token = await Encrypt.issueToken({ id });
    const path = `${confirmMailPath}?tk=${token}`;
    message = `<h2> Hello, Welcome to BookAMeal </br> Please click this link to confirm your mail <br/> ${path} </h2>`;
    subject = 'Confirm YourEmail';
    destination = email;
    const body = { message, destination, subject };
    dispatch(body);
    return token;
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
