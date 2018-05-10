import BaseMiddleware from '../base-middleware';
import ValidatorError from '../../services/auth/errors/validation';
import OrderModel from '../../models/v1/orders';
import models from '../../models/v2/relationship';
import MenuModel from '../../models/v1/menu';
import KitchenMiddleware from '../kitchen';
import MealMiddleware from '../meals'

const { Order } = models;

let order;
let menu;
let ref;
let err;

/* eslint radix: 0, no-restricted-globals: 0, no-underscore-dangle: 0, no-shadow: 0 */
class OrdersMiddlewareBase extends BaseMiddleware {
  constructor(model) {
    super(model);
    this.model = model;
  }

  // ================= methods that matter in challenge 3 ====================
  checkType = (req, res, next) => {
    if (!req.query || !req.query.type) {
      return next(new ValidatorError('This request requires a type query which should be user or kitchen', 400));
    }
    req.qualifier = req.query.type;
    // this is to check for the user
    if (req.qualifier === 'kitchen') {
      if (this.__ensureKitchenOwner(req, res)) {
        req.key = req.kitchen.id
        if (req.method === 'PUT') {
          req.target = req.kitchen.id;
        }
        return next();
      }
      return next(new ValidatorError('Sorry, you need to have a kitchen to perform this operation', 403));
    }
    // check that ths user owns a kitchen
    req.key = req.user.id;
    if (req.method === 'PUT' && req.qualifier === 'user') {
      if (!req.query.mealId) {
        return next(new ValidatorError('Please pass in the meal to be changed', 400));
      }
      req.target = req.query.mealId;
      return next();
    }
    next();
}

  checkUpdateType = (req, res, next) => {
    if (!req.query || !req.query.type) {
      next(new ValidatorError('This query is invalid', 400));
    }
    req.qualifier = req.query.type;
  }

  appendOwner = (req, res, next) => {
    req.body = { ...req.body, UserId: req.user.id };
    next();
  }

  __revokeAccess = (req, res, next) => {
    if (req.qualifier === 'kitchen' && !req.kitchen) {
      err = new ValidatorError('You need to have a kitchen set up', 403);
      return next(err);
    } else if (req.qualifier === 'kitchen' && req.kitchen) {
      Order.findOne({ where: { id: req.params.ooid } })
        .then((order) => {
          if (!order || !Object.keys(order.status).includes(req.kitchen.id)) {
            err.message = 'Your kitchen is not permitted to do that';
            err.status = 401;
            next(err);
          }
          next();
        });
    }
  }

  // =============== methods that matter in challenge 2 =========================


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
