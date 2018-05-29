import { isUUID } from 'validator';
import MenuModel from '../../models/v1/menu';
import BaseMiddleware from '../base-middleware';
import User from '../../models/v1/user';
import ValidatorError from '../../services/auth/errors/validation';
import models from '../../models/v2/relationship';

let target;
let stats
const ref = {};
const { Menu } = models;
let culprit;

class MenuMiddlewareBase extends BaseMiddleware {
  constructor(model) {
    super();
    this.model = model;
  }

  // ================  methods that matter in challenge 3 ========================
  __revokeAccess = (req, res, next) => {
    if (!req.kitchen) {
      return next(new ValidatorError('You do not have a kitchen, please set up one', 409));
    }
    Menu.findOne({ where: { id: req.params.mmid } })
      .then((meal) => {
        if (!meal || meal.Kitchen === req.kitchen.id) {
          return next(new ValidatorError('You do not have permissions to do that', 401));
        }
        return next();
      });
  }

  __checkRequired = (req, res, next) => {
    if (!req.body.meals || req.body.meals.constructor !== Array) {
      return next(new ValidatorError('Please ensure that the request has a meals array field in its body', 400));
    }
    // check that the object contained in the meals is valid and all of that;
    if (!req.body.meals.some((mealObject) => {
      if (mealObject.constructor !== Object || !mealObject.id || !isUUID(mealObject.id)) {
        return false;
      }
      return true;
    })) {
      return next(new ValidatorError('Hey, Please check that you sent the right data in the meals field', 400));
    }
    // check for unique keys in meals input;
    target = req.body.meals.map((item) => {
      stats = req.body.meals.filter(meal => meal.id === item.id);
      return stats.length;
    }).filter(count => count > 1);

    if (target.length > 0) {
      return next(new ValidatorError('There might be duplicate keys in the meals field, check Please', 400));
    }
    return next();
  }

  // ==============  methods that matter in challenge 2 ========================

  /* eslint max-len: 0, radix: 0, no-underscore-dangle: 0 */
  revokeAccess = (req, res, next) => {
    ref.id = parseInt(req.query.uuid);
    target = User.findOne(ref);
    if (!target || !target.kitchen || !this._checkAuthenticity(req.headers.authorization, target.kitchen)) {
      return next(new ValidatorError('You do not have permissions to do that', 401));
    }
    req.user = target;
    return next();
  };
}

const MenuMiddleware = new MenuMiddlewareBase(MenuModel);
export default MenuMiddleware;
