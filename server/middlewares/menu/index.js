import MenuModel from '../../models/v1/menu';
import BaseMiddleware from '../base-middleware';
import User from '../../models/v1/user';
import ValidatorError from '../../services/auth/errors/validation';
import models from '../../models/v2/relationship';

let target;
const ref = {};
const { Menu } = models;

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
