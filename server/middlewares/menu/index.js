import Menu from '../../models/v1/menu';
import BaseMiddleware from '../base-middleware';
import User from '../../models/v1/user';
import ValidatorError from '../../services/auth/errors/validation';

let target;
const ref = {};

class MenuMiddlewareBase extends BaseMiddleware {
  constructor(model) {
    super();
    this.model = model;
  }
  /* the logic is that the user requests to setthe menu of the ay for his kitchen;
  so we check the userid query and find the user, then check the salted hash of his kitchen
  if it matches the hash provided in the req.authorization;
   */
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

const MenuMiddleware = new MenuMiddlewareBase(Menu);
export default MenuMiddleware;
