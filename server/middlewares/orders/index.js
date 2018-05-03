import BaseMiddleware from '../base-middleware';
import ValidatorError from '../../services/auth/errors/validation';
import OrderModel from '../../models/v1/orders';
import MenuModel from '../../models/v1/menu';
import KitchenMiddleware from '../kitchen';

let order;
let menu
let ref;

/* eslint radix: 0, no-restricted-globals: 0 */
class OrdersMiddlewareBase extends BaseMiddleware {
  constructor(model) {
    super(model);
    this.model = model
  }
  checkType = (req, res, next) => {
    if (!req.query || !req.query.type || !req.params) {
      next(new ValidatorError('This query is invalid', 400));
    }
    req.qualifier = req.query.type;
    req.key = req.qualifier === 'kitchen' ? req.query.ktid : req.query.uuid;
    next();
  }

  appendOwner = (req, res, next) => {
    req.body = { ...req.body, client: parseInt(req.query.uuid) };
    next();
  }
  // The logic here is to make sure the kitchen //the order in the params, the kitchen in the query
  revokeAccess = (req, res, next) => {
    // check that there is the menu key in the body
    if (!req.body.menuKey && isNaN(parseInt(req.body.menuKey))) {
      return next(new ValidatorError('Please pass in the right query'));
    }
    // find the order and check if the order includes the menu;
    ref.id = parseInt(req.params.ooid);
    order = this.model.findOne(ref);
    menu = MenuModel.findOne('kitchen', req.query.ktid);
    if (order && order.content[`${req.body.menuKey}`] && menu.owner === req.query.ktid) {
      return next();
    }
    return next(new ValidatorError('You do not have permissions to do that', 401));
  }

  restrictAccess = (req, res, next) => {
    // check if it's a user;
    if (req.qualifier === 'user') {
      if (this._checkAuthenticity(req.headers.authorization, `HellothereKanye${req.query.uuid}`)) {
        return next();
      }
      return next(new ValidatorError('You do not have permissions to do that', 401));
    } else if (req.qualifier === 'kitchen') {
      KitchenMiddleware.checkMasterKey(req, res, next);
      req.params.ktid = req.query.ktid;
      KitchenMiddleware.revokeAccess(req, res, next);
    }
  }
}

const OrdersMiddleware = new OrdersMiddlewareBase(OrderModel);
export default OrdersMiddleware;
