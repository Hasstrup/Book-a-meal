import { isEmail, isUUID } from 'validator';
import Encrypt from '../helpers/encrypt/';
import ValidatorError from '../services/auth/errors/validation';
import models from '../models/v2/relationship';

const { User } = models;

let err;
let data;
const allowed = [ 'password', 'quantity', 'price' ];
let valid = true;
let culprit;

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
        return next(err);
      }
      data = Object.values(req.body).filter(item => !isNaN(parseInt(item)));
      if (data.length > 0) {
        if (!data.some((item) => {
          if (item <= 0) {
            return false;
          }
          return true;
        })) {
          err = new Error('Did you enter a number less than 0? Please check');
          err.status = 400;
          return next(err);
        }
      }
      // check string fields for numbers
      Object.keys(req.body).forEach((key) => {
        if (!isNaN(parseInt(req.body[`${key}`])) && !allowed.includes(key)) {
          culprit = key
          valid = false;
        }
      });
      if (!valid) {
        err = new Error(`Thats the wrong Datatype for ${culprit}, Please change`);
        err.status = 422;
        valid = true;
        return next(err);
      }
      // check the price field for the price;
      if (req.body.price) {
        if (isNaN(parseInt(req.body.price))) {
          err = new Error('Please check the data type for price, Should be a number');
          err.status = 422;
          return next(err);
        }
      }
      return next();
    }
    err = new Error('Theres no content in the request body, please fill with all required fields');
    err.status = 400;
    return next(err);
  }

  __filterAccess = (req, res, next) => {
    Encrypt.decodeToken(req.headers.authorization)
      .then(async (payload) => {
        data = await this.getCurrentUser(payload, next);
        req.user = data.get({ plain: true });
        console.log(req.user);
        req.kitchen = data.Kitchen ? data.Kitchen : null;
        return next();
      })
      .catch(() => next(new ValidatorError('Something went wrong trying to grant you access, Token might be deformed', 401)) );
  }

  __ensureKitchenOwner = (req, res, next) => {
    if (!req.kitchen) {
      err = new ValidatorError('Sorry but you need to have a kitchen to perform this action', 403);
      if (next) {
        return next(err);
      }
      return false;
    }
    if (next) {
      return next();
    }
    return true
  }


  getCurrentUser = async (payload) => {
    const { id } = payload;
    if (!id) {
      throw new ValidatorError('That token might be invalid, Please check that again ', 404);
    }
    data = await User.findOne({ where: { id }, include: [{ all: true }] });
    if (!data) {
      throw new ValidatorError('Sorry we couldnt find any user matching your criteria', 404);
    }
    return data;
  }


  static checkAuthorization = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
      err = new Error('You need to be authorized to do this, ensure that the token is the value for the authorization field in the request header');
      err.status = 403;
      return next(err);
    }
    return next();
  }

  static __checkParams = (req, res, next) => {
    data = Object.entries(req.params);
    if (data.length === 0) { return next(); }
    if (!data.some((item) => {
      if (isUUID(item[1])) {
        return true;
      }
      culprit = item[0];
      return false;
    })) {
      return next(new ValidatorError(`The Datatype for the params (${culprit}) sent is incorrect please check again`, 400));
    }
    next();
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
    data = this.model.required.map((key) => {
      if (req.body[`${key}`] && req.body[`${key}`].constructor === this.model.keys[`${key}`]) {
        return { status: true, key }
      } else if (req.body[`${key}`] && key === 'price') {
        return { status: true, key };
      }
      return { status: false, key };
    });

    data = data.filter(item => !item.status);
    if (data.length === 0) {
      return next();
    }
    let string;
    data.forEach((field) => {
      string = `${field.key} is missing somewhere in the request body, Please check`;
    });

    err = new Error(string);
    err.status = 400;
    return next(err);
  }


  static checkForEmail = (req, res, next) => {
    try {
      if (req.body.email && req.body.email.toString().length > 1 && isEmail(req.body.email)) {
        return next();
      }
      err = new Error('Something might be wrong with the values, check the email please');
      err.status = 400;
      next(err);
    } catch (e) {
      err = new Error('Ensure the email is present and valid for this to work');
      err.status = 422;
      return next(err);
    }
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
