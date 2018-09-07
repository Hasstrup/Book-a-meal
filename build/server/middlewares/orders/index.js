'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _validator = require('validator');

var _baseMiddleware = require('../base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _validation = require('../../services/auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

var _orders = require('../../models/v1/orders');

var _orders2 = _interopRequireDefault(_orders);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _menu = require('../../models/v1/menu');

var _menu2 = _interopRequireDefault(_menu);

var _kitchen = require('../kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = _relationship2.default.Order;


var order = void 0;
var menu = void 0;
var ref = void 0;
var err = void 0;
var valid = void 0;

/* eslint radix: 0, no-restricted-globals: 0, max-len: 0, no-underscore-dangle: 0, no-shadow: 0 */

var OrdersMiddlewareBase = function (_BaseMiddleware) {
  _inherits(OrdersMiddlewareBase, _BaseMiddleware);

  function OrdersMiddlewareBase(model) {
    _classCallCheck(this, OrdersMiddlewareBase);

    var _this = _possibleConstructorReturn(this, (OrdersMiddlewareBase.__proto__ || Object.getPrototypeOf(OrdersMiddlewareBase)).call(this, model));

    _this.checkType = function (req, res, next) {
      var allowed = ['user', 'kitchen'];
      if (!req.query || !req.query.type || !allowed.includes(req.query.type)) {
        return next(new _validation2.default('This request requires a type query which should be user or kitchen', 400));
      }
      req.qualifier = req.query.type;
      // this is to check for the user
      if (req.qualifier === 'kitchen') {
        if (_this.__ensureKitchenOwner(req, res)) {
          req.key = req.kitchen.id;
          console.log(req.key);
          if (req.method === 'PUT') {
            req.target = req.kitchen.id;
          }
          return next();
        }
        return next(new _validation2.default('Sorry, you need to have a kitchen to perform this operation', 403));
      }
      // check that ths user owns a kitchen
      req.key = req.user.id;
      if (req.method === 'PUT' && req.qualifier === 'user') {
        if (!req.query.mealId) {
          return next(new _validation2.default('Please pass in the meal to be changed, should be in the query', 400));
        }
        req.target = req.query.mealId;
        return next();
      }
      next();
    };

    _this.checkUpdateType = function (req, res, next) {
      if (!req.query || !req.query.type) {
        next(new _validation2.default('This query is invalid', 400));
      }
      req.qualifier = req.query.type;
    };

    _this.appendOwner = function (req, res, next) {
      req.body = _extends({}, req.body, { UserId: req.user.id });
      next();
    };

    _this.__revokeAccess = function (req, res, next) {
      if (req.qualifier === 'kitchen' && !req.kitchen) {
        err = new _validation2.default('You need to have a kitchen set up', 403);
        return next(err);
      } else if (req.qualifier === 'kitchen' && req.kitchen) {
        return Order.findOne({ where: { id: req.params.ooid } }).then(function (order) {
          if (!order || !Object.keys(order.status).includes(req.kitchen.id)) {
            err = new _validation2.default('Your kitchen is not permitted to do that', 401);
            return next(err);
          }
          return next();
        });
      } else if (req.qualifier === 'user' && req.user) {
        return Order.findOne({ where: { id: req.params.ooid } }).then(function (order) {
          if (!order || order.UserId !== req.user.id) {
            err = new _validation2.default('You are not permitted to do that', 401);
            return next(err);
          }
          return _baseMiddleware2.default.checkForNullInput(req, res, next);
        });
      }
      err = new Error('Please sign in to continue this action');
      err.status = 403;
      next(err);
    };

    _this.__checkRequired = function (req, res, next) {
      if (!req.body.meals || req.body.meals.constructor !== Array || req.body.meals.length < 1) {
        err = new _validation2.default('The input sent must contain a meals with an array of at least one meal object', 400);
        return next(err);
      }
      if (!req.body.meals.some(function (item) {
        if (item.id && item.quantity && item.kitchen && (0, _validator.isUUID)(item.id) && (0, _validator.isUUID)(item.kitchen) && item.quantity.constructor === Number && item.quantity > 0) {
          return true;
        }return false;
      })) {
        err = new _validation2.default('Please check the contents of the meal array, might contain invalid data', 400);
        return next(err);
      }
      if (_this.__ensureKitchenOwner(req, res)) {
        req.body.meals.forEach(function (item) {
          if (item.kitchen === req.kitchen.id) {
            valid = false;
          }
        });
        if (!valid) {
          err = new _validation2.default('Please dont try placing an order on your content', 403);
          valid = true;
          return next(err);
        }
      }
      return next();
    };

    _this.revokeAccess = function (req, res, next) {
      // check that there is the menu key in the body
      if (!req.body.menuKey && isNaN(parseInt(req.body.menuKey))) {
        return next(new _validation2.default('Please pass in the right query'));
      }
      // find the order and check if the order includes the menu;
      ref.id = parseInt(req.params.ooid);
      order = _this.model.findOne(ref);
      menu = _menu2.default.findOne('kitchen', req.query.ktid);
      if (order && order.content['' + req.body.menuKey] && menu.owner === req.query.ktid) {
        return next();
      }
      return next(new _validation2.default('You do not have permissions to do that', 401));
    };

    _this.restrictAccess = function (req, res, next) {
      // check if it's a user;
      if (req.qualifier === 'user') {
        if (_this._checkAuthenticity(req.headers.authorization, 'HellothereKanye' + req.query.uuid)) {
          return next();
        }
        return next(new _validation2.default('You do not have permissions to do that', 401));
      } else if (req.qualifier === 'kitchen') {
        _kitchen2.default.checkMasterKey(req, res, next);
        req.params.ktid = req.query.ktid;
        _kitchen2.default.revokeAccess(req, res, next);
      }
    };

    _this.model = model;
    return _this;
  }

  // ================= methods that matter in challenge 3 ====================


  // =============== methods that matter in challenge 2 =========================


  // The logic here is to make sure the kitchen //the order in the params, the kitchen in the query


  return OrdersMiddlewareBase;
}(_baseMiddleware2.default);

var OrdersMiddleware = new OrdersMiddlewareBase(_orders2.default);
exports.default = OrdersMiddleware;