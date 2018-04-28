import { isEmail } from 'validator';

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
    next(err);
  }

  static checkForEmail = (req, res, next) => {
    if (req.body.email && req.body.email.toString().length > 1 && isEmail(req.body.email)) {
      next();
    }
    err = new Error('ensure  the email is present for this to work');
    err.status = 400;
    next(err);
  }

  /* check if the model is valid and and bind the model to this */
  setModel = (model) => {
    if (!model) {
      throw new Error('The model has to be a DataHandler instance');
    }
    this.model = model;
  }

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
      next(err);
    }
    next();
  }


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
      next();
    }
    err = new Error('There is no identifier for this request');
    err.status = 401;
    next(err);
  }
}

export default BaseMiddleware;
