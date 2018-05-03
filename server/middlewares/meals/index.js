import BaseMiddleware from '../base-middleware';
import MealModel from '../../models/v1/meal';
import ValidatorError from '../../services/auth/errors/validation';
import KitchenModel from '../../models/v1/kitchen';

let source;
const ref = {};

/* eslint radix: 0, no-underscore-dangle: 0 */
class MealMiddlewareBase extends BaseMiddleware {
  constructor(model) {
    super();
    this.model = model;
  }

  /* this method will check that the requesting user has a kitchen */
  restrictAccess = (req, res, next) => {
    ref.id = parseInt(req.params.ktid);
    source = KitchenModel.findOne(ref);
    if (source && this._checkAuthenticity(req.headers.authorization, source.caterer)) {
      req.kitchen = source;
      return next();
    }
    return next(new ValidatorError('You do not have permissions to do that', 401));
  }

  revokeAccess = (req, res, next) => {
    const { kitchen } = req;
    const { mealId } = req.query;
    if (kitchen && kitchen.meals && kitchen.meals.includes(parseInt(mealId))) {
      return next();
    }
    return next(new ValidatorError('You do not have permissions to do that', 401));
  }
}

const MealMiddleware = new MealMiddlewareBase(MealModel);

export default MealMiddleware;
