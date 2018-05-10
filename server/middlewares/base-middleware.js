import { isEmail } from 'validator';
import Encrypt from '../helpers/encrypt/';
import ValidatorError from '../services/auth/errors/validation';
import models from '../models/v2/relationship';

const { User } = models;

let err;
let data;

class BaseMiddleware {




// ================= methods that matter in challenge 3 ===========================


  static checkForNullInput(req, res, next) {
    const body = Object.keys(req.body);
    if (body.length) {
      if (!Object.keys(req.body).some((key, index) => {
        if (Object.values(req.body)[`${index}`].toString().length < 1) {
          return false;
        } return true;
      })) {
        err = new Error('Incomplete values in the request body');
        err.status = 400;
        next(err);
      }
      return next();
    }
    err = new Error('Theres no content in the request body');
    err.status = 400;
    return next(err);
  }


  __filterAccess = (req, res, next) => {
    Encrypt.decodeToken(req.headers.authorization)
      .then(async (payload) => {
        data = await this.getCurrentUser(payload, next);
        req.user = data.get({ plain: true });
        req.kitchen = data.Kitchen ? data.Kitchen : null;
        return next();
      })
      .catch(() => next(new ValidatorError('Something went wrong trying to grant you access, Token might be deformed', 401)) );
  }

  __ensureKitchenOwner = (req, res, next) => {
    if (!req.kitchen) {
      err = new ValidatorError('You need to have a kitchen to perform this action', 403);
      if (next) {
        return next(err);
      }
      return false;
    }
    if (next) {
      return next();
    }
    return true; }


  getCurrentUser = async (payload) => {
    const { id } = payload;
    if (!id) {
      throw new ValidatorError('That token might be invalid', 404);
    }
    data = await User.findOne({ where: { id }, include: [{ all: true }] });
    if (!data) {
      throw new ValidatorError('Sorry we couldnt find any user like that', 404);
    }
    return data;
  }


  static checkAuthorization = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
      err = new Error('You need to be authorized to do this');
      err.status = 403;
      return next(err);
    }
    return next();
  }


  checkRequiredParams = (req, res, next) => {
    const { key } = this.model.masterKey;
    if (req.params[`${key}`]) {
      return next();
    }
    err = new Error('A required param is missing');
    err.status = 400;
    return next(err);
  }


  checkRequired = (req, res, next) => {
    if (!this.model) {
      err = new Error('No model present for the checkRequired middleware');
      err.status = 500;
      next(err);
      return;
    }
    const { model } = this;
    if (!this.model.required.some((key) => {
      if (!req.body[`${key}`] || req.body[`${key}`].constructor !== model.keys[`${key}`]) {
        return false;
      }
      return true;
    })) {
      err = new Error('A required field is missing');
      err.status = 400;
      return next(err);
    }
    return next();
  }


  static checkForEmail = (req, res, next) => {
    if (req.body.email && req.body.email.toString().length > 1 && isEmail(req.body.email)) {
      return next();
    }
    err = new Error('ensure  the email is present for this to work');
    err.status = 400;
    return next(err);
  }

  /* eslint no-restricted-globals: 0, radix: 0 */
  checkMasterKey = (req, res, next) => {
    if (!this.model.masterKey || !this.model.masterKey.key || !this.model.masterKey.type) {
      err = new Error('No masterkey set for this model');
      err.status = 500;
      next(err);
    }
    const { key } = this.model.masterKey;
    const { type } = this.model.masterKey;
    // check the query for the key && pass the query as req.`${key}`
    if (req.query[`${key}`] && req.query[`${key}`].constructor === type) {
      req[`${key}`] = req.query[`${key}`];
      return next();
    } else if (req.query[`${key}`] && type === Number && !isNaN(parseInt(req.query[`${key}`]))) {
      req[`${key}`] = req.query[`${key}`];
      return next();
    }
    err = new Error('There is no identifier for this request at all');
    err.status = 401;
    return next(err);
  }

  checkForTokenQuery = (req, res, next) => {
    if (!req.query.tk) {
      err = new Error('There needs to be token for this to work');
      err.status = 403;
      return next(err);
    }
    next();
  }


  // ================= methods that matter in challenge 2 ===========================
  /**
   *
   */
  static checkPopulateQuery = (req, res, next) => {
    if (req.query && req.query.populate && req.query.populate === 'populate') {
      req.populate = true;
      return next();
    }
    return next();
  }

  /* check if the model is valid and and bind the model to this */
  setModel = (model) => {
    if (!model) {
      throw new Error('The model has to be a DataHandler instance');
    }
    this.model = model;
  }

  _checkAuthenticity = (str1, str2) => str1.toString() === this.hashString(`HellothereKanye${str2}`).toString();


  static revokeAccess = (req, res, next) => {
    const target = Object.keys(req.params)[0];
    if (req.headers.authorization.toString() === Encrypt.hashStr(`Hellothere${req.params[`${target}`]}`).toString()) {
      return next();
    }
    err = new Error('You need to be authorized to do this');
    err.status = 403;
    return next(err);
  }
  static restrictAccess = (req, res, next) => {
    const target = Object.keys(req.query)[0];
    if (req.headers.authorization.toString() === Encrypt.hashStr(`HellothereKanye${req.query[`${target}`]}`).toString()) {
      return next();
    }
    err = new Error('You need to be authorized to do this');
    err.status = 403;
    return next(err);
  }


   hashString = str => Encrypt.hashStr(str);
}

export default BaseMiddleware;
