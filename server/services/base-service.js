import ValidatorError from './auth/errors/validation';

let data;

/* eslint class-methods-use-this: 0, no-return-await: 0, prefer-const: 0, no-restricted-globals: 0, no-underscore-dangle: 0 */
class BaseService {
  constructor(model, __model) {
    this.model = model;
    this.__model = __model;
  }
  /**
   * create creates a new item in my mock database
   * @param  {Integer}  id   the id of the item
   * @param  {Object}  body body of the item to be created
   * @return {Object}      [description]
   */
  create = async (id, body) => {
    if (!id || !body || isNaN(id) || (typeof body) !== 'object') {
      return this.badRequest('please pass in the right values :)');
    }
    data = Object.assign({}, body, { owner: id });
    return await this.model.create(data);
  }

  fetchAll(populate) {
    if (populate && populate === 'populate') {
      return this.model.getAll('populate');
    }
    return this.model.getAll();
  }

  fetchOne = (key, value, populate) => {
    this.checkArguments(key, value, populate);
    let ref = {};
    ref[`${key}`] = value;
    if (populate && populate === 'populate') {
      return this.model.findOne(ref, populate);
    }
    return this.model.findOne(ref);
  }

  updateOne = async (key, value, changes) => {
    this.checkArguments(key, value, changes);
    if ((typeof changes) !== 'object') {
      return this.unprocessableEntity('Invalid object thrown to the center');
    }
    let ref = {};
    ref[`${key}`] = value;
    return await this.model.findOneAndUpdate(ref, changes);
  }

  deleteOne = (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    return this.model.findOneAndDelete(ref);
  }


  __create = async (body) => {
    if (!body || (typeof body) !== 'object') {
      return this.badRequest('please pass in the right values :)');
    }
    return await this.__model.create(body);
  }

  __fetchAll = async () => {
    return await this.__model.findAll({ include: [{ all: true }] });
  }

  __fetchOne = async (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    return await this.__model.findOne({ where: ref, include: [{ all: true }] });
  }

  __updateOne = async (key, value, changes) => {
    this.checkArguments(key, value, changes);
    if ((typeof changes) !== 'object') {
      return this.unprocessableEntity('Invalid object thrown to the center');
    }
    let ref = {};
    ref[`${key}`] = value;
    data = await this.__model.findOne({ where: ref });
    await data.update(changes);
    return data;
  }

  __deleteOne = async (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.__model.findOne({ where: ref });
    return await data.destroy();
  }

  throwError = (message, status) => {
    throw new ValidatorError(message, status);
  }

  unAuthenticated = (message) => {
    this.throwError(message, 401);
  }

  badRequest = (message) => {
    this.throwError(message, 400);
  }

  noPermissions = (message) => {
    this.throwError(message, 403);
  }
  resourceNotFound = (message) => {
    this.throwError(message, 404);
  }

  unprocessableEntity(message) {
    this.throwError(message, 422);
  }

  databaseError(message) {
    this.throwError(message, 409);
  }

  checkArguments(...params) {
    if (params.length < 2 || params.length > 5 || params[0].constructor !== String) {
      return this.badRequest('Please pass in the right arguments');
    }
  }
}

export default BaseService;
