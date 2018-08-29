import BaseService from '../base-service';
import DummyUserModel from '../../models/v1/user';
import models from '../../models/v2/relationship';
import UserService from '../users/';
import Encrypt from '../../helpers/encrypt';

// Persistent model
const { User } = models
let data;

/* eslint no-underscore-dangle: 0 */
class AuthModuleBase extends BaseService {
  constructor(model, __model) {
    super();
    if (model) {
      this.model = model;
      this.__model = __model;
    }
  }

  signUp = async (body) => {
    try {
      const baseData = {};
      this.model.required.forEach((key) => {
        if (body[`${key}`] && JSON.stringify(body[`${key}`]).split('').length > 0 && body[`${key}`].constructor === this.model.keys[`${key}`]) {
          return;
        }
        this.unprocessableEntity(`${key} is either missing or invalid`);
      });
      if (this.model.keys && this.model.create) {
        Object.keys(this.model.keys).forEach((key) => {
          if (body[`${key}`] && body[`${key}`].constructor === this.model.keys[`${key}`]) {
            baseData[`${key}`] = body[`${key}`];
            return;
          } else if (!body[`${key}`] && (this.model.keys[`${key}`].constructor === Array || this.model.keys[`${key}`].constructor === Object)) {
            if (this.model.keys[`${key}`].constructor === Array) {
              baseData[`${key}`] = [];
              return;
            }
            baseData[`${key}`] = null;
          }
          baseData[`${key}`] = null;
        });
        /* eslint no-return-await: 0 */
        data = await this.__model.create(baseData);
        UserService.__sendConfirmMail(data.id, data.email);
        const token = await Encrypt.issueToken({ id: data.id, confirmedEmail: data.confirmedEmail });
        return { ...data.get({ plain: true }), token }
      }
    } catch (e) {
      if (e.errors) {
        if (e.errors[0].validatorKey === 'not_unique') {
          this.databaseError(`This ${e.errors[0].path} is already taken, Sorry`);
        }
        this.unprocessableEntity(`${e.errors[0].message}`);
      }
      this.unprocessableEntity(`${e.message}`);
    }
  }

  authenticate = async (user, baseModel = this.__model) => {
    /* check for missing fields in the user input */
    let data;
    let target;
    let validuser;
    if (Object.values(user).length >= 2) {
      // check the data in the baseModel;
      data = await baseModel.findAll();
      target = data.filter(item => item.username === user.username);
      if (target.length < 1) {
        this.unprocessableEntity('No record found with such user');
      }
      /* eslint prefer-destructuring: 0 */
      validuser = target[0];
      if (validuser.password === user.password) {
        return true;
      }
      this.noPermissions('Invalid username and password combination');
    }
    this.unprocessableEntity('Certain required fields are missing');
  }

  __authenticate = async (user) => {
    if (Object.entries(user).length >= 2) {
      const dbuser = await this.__model.findOne({ where: { email: user.email } });
      if (!dbuser) {
        return this.unprocessableEntity('No record found with such user');
      }
      if (Encrypt.checkPassword(user.password, dbuser.password)) {
        // Get the token;
        const token = await Encrypt.issueToken({ id: dbuser.id, confirmedEmail: dbuser.confirmedEmail });
        return { ...dbuser.get({ plain: true }), token };
      }
      this.noPermissions('Invalid username and password combination');
    }
    this.unprocessableEntity('Certain required fields are missing');
  }
}

const AuthModule = new AuthModuleBase(DummyUserModel, User);
export default AuthModule;
