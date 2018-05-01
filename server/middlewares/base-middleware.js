import { isEmail } from 'validator';
import Encrypt from '../helpers/encrypt/';

let err;

class BaseMiddleware {
  static checkForNullInput(req, res, next) {
    const body = Object.keys(req.body);
    if (body.length) {
      if (!Object.keys(req.body).some((key, index) => {
        if (Object.values(req.body)[`${index}`].toString().length < 1) {
          return false;
        } return true;
      })) {
        err = new Error('Incomplete values in the body');
        err.status = 400;
        next(err);
      }
      return next();
    }
    err = new Error('Theres no content in the body');
    err.status = 400;
    return next(err);
  }

  static checkForEmail = (req, res, next) => {
    if (req.body.email && req.body.email.toString().length > 1 && isEmail(req.body.email)) {
      next();
    }
    err = new Error('ensure  the email is present for this to work');
    err.status = 400;
    return next(err);
  }

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


  /* get the required fields from the model and their types from the model's keys */
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
      } return true;
    })) {
      err = new Error('A required field is missing');
      err.status = 400;
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
    err = new Error('There is no identifier for this request');
    err.status = 40.1;
    return next(err);
  }

  static checkAuthorization = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
      err = new Error('You need to be authorized to do this');
      err.status = 403;
      return next(err);
    }
    return next();
  }

  static revokeAccess = (req, res, next) => {
    const target = Object.keys(req.params)[0];
    if (req.headers.authorization.toString() === Encrypt.hashStr(`Hellothere${req.params[`${target}`]}`).toString()) {
      return next();
    }
    err = new Error('You need to be authorized to do this');
    err.status = 403;
    return next(err);
  }

   hashString = str => Encrypt.hashStr(str);
}

export default BaseMiddleware;
