import BaseMiddleware from '../base-middleware';
import ValidatorError from '../../services/auth/errors/validation';
import KitchenModel from '../../models/v1/kitchen';

let kitchen;
const ref = {};


/**
 * Class Kitchen Middleware
 * @class Kitchen Middleware
 * @desc inherits from base and checks the request body for all the
 * @param {object} model  
 */
/* eslint radix: 0, no-underscore-dangle: 0, no-restricted-globals: 0 */
export class KitchenMiddleWareParent extends BaseMiddleware {
  constructor(model) {
    super();
    this.model = model;
  }


  /**
   *  RevokeAccess
   * @method revokeAccess
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @desc This middleware makes sure the user contained in the params making the request is the owner of the kitchen
   * @returns {object} response || next
   */
  revokeAccess = (req, res, next) => {
    try {
      ref.id = parseInt(req.params.ktid);
      kitchen = this.model.findOne(ref);
      if (!kitchen) {
        throw new ValidatorError('No such kitchen in the store', 404);
      }
      if (this._checkAuthenticity(req.headers.authorization, kitchen.caterer)) {
        return next();
      }
      throw new ValidatorError('You do not have permissions to do that', 401);
    } catch (e) {
      e.status = e.status ? e.status : 400;
      return next(e);
    }
  }

  _checkAuthenticity = (str1, str2) => str1.toString() === this.hashString(`HellothereKanye${str2}`).toString();


  /**
   *  RevokeAccess
   * @method revokeAccess
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @desc Ensures there is a kitchen id in the params
   * @returns {object} response || next
   */
  checkKitchenParams = (req, res, next) => {
    if (req.params.ktid && !isNaN(parseInt(req.params.ktid))) {
      return next();
    }
    return next(new ValidatorError('Please check again that you have the right parameters', 400));
  }

  /**
   *  RevokeAccess
   * @method revokeAccess
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @desc Ensures the user contained in the query is contained
   * @returns {object} response || next
   */
  restrictAccess = (req, res, next) => {
    try {
    // checkmasterkey;
      ref.id = parseInt(req.query.ktid);
      kitchen = this.model.findOne(ref);
      if (kitchen) {
        if (this._checkAuthenticity(req.headers.authorization, kitchen.caterer)) {
          return next();
        }
        return next(new ValidatorError('You do not have permissions to view this', 401));
      }
      return next(new ValidatorError('No such kitchen', 404));
    } catch (e) {
      return next(e);
    }
  }
}

const KitchenMiddleware = new KitchenMiddleWareParent(KitchenModel);
export default KitchenMiddleware;
