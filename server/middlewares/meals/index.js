import BaseMiddleware from '../base-middleware';
import MealModel from '../../models/v1/meal';
import ValidatorError from '../../services/auth/errors/validation';
import KitchenModel from '../../models/v1/kitchen';
import models from '../../models/v2/relationship';

const { Meal } = models;

let source;
const ref = {};

/* eslint radix: 0, no-underscore-dangle: 0 */
class MealMiddlewareBase extends BaseMiddleware {
  constructor(model) {
    super();
    this.model = model;
  }

  // ============ methods that matter in challenge 3 ===========

  __revokeAccess = (req, res, next) => {
    Meal.findOne({ where: { id: req.params.mealId } })
      .then((meal) => {
        if (!meal || meal.kitchenId !== req.kitchen.id) {
          return next(new ValidatorError('You do not have permissions to do that', 401));
        }
        return next();
      });
  }

  // ======== methods that matter in challege 2 ==========================

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
