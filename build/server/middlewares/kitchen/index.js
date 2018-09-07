'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KitchenMiddleWareParent = undefined;

var _baseMiddleware = require('../base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _validation = require('../../services/auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

var _kitchen = require('../../models/v1/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var kitchen = void 0;
var ref = {};

/**
 * Class Kitchen Middleware
 * @class Kitchen Middleware
 * @desc inherits from base and checks the request body for all the
 * @param {object} model
 */
/* eslint radix: 0, no-underscore-dangle: 0, no-restricted-globals: 0 */

var KitchenMiddleWareParent = exports.KitchenMiddleWareParent = function (_BaseMiddleware) {
  _inherits(KitchenMiddleWareParent, _BaseMiddleware);

  function KitchenMiddleWareParent(model) {
    _classCallCheck(this, KitchenMiddleWareParent);

    var _this = _possibleConstructorReturn(this, (KitchenMiddleWareParent.__proto__ || Object.getPrototypeOf(KitchenMiddleWareParent)).call(this));

    _this.__revokeAccess = function (req, res, next) {
      if (!req.kitchen || !req.kitchen.id === req.params.ktid) {
        next(new _validation2.default('You do not have permissions to do that', 404));
      }
      next();
    };

    _this.revokeAccess = function (req, res, next) {
      try {
        ref.id = parseInt(req.params.ktid);
        kitchen = _this.model.findOne(ref);
        if (!kitchen) {
          throw new _validation2.default('No such kitchen in the store', 404);
        }
        if (_this._checkAuthenticity(req.headers.authorization, kitchen.caterer)) {
          return next();
        }
        throw new _validation2.default('You do not have permissions to do that', 401);
      } catch (e) {
        e.status = e.status ? e.status : 400;
        return next(e);
      }
    };

    _this._checkAuthenticity = function (str1, str2) {
      return str1.toString() === _this.hashString('HellothereKanye' + str2).toString();
    };

    _this.checkKitchenParams = function (req, res, next) {
      if (req.params.ktid) {
        return next();
      }
      return next(new _validation2.default('Please check again that you have the right parameters', 400));
    };

    _this.restrictAccess = function (req, res, next) {
      try {
        // checkmasterkey;
        ref.id = parseInt(req.query.ktid);
        kitchen = _this.model.findOne(ref);
        if (kitchen) {
          if (_this._checkAuthenticity(req.headers.authorization, kitchen.caterer)) {
            return next();
          }
          return next(new _validation2.default('You do not have permissions to view this', 401));
        }
        return next(new _validation2.default('No such kitchen', 404));
      } catch (e) {
        return next(e);
      }
    };

    _this.model = model;
    return _this;
  }

  // ============ methods that matter in challenge 3 =============


  // ============ methods that matter in challenge 2 ==============
  /**
   *  RevokeAccess
   * @method revokeAccess
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @desc This middleware makes sure the user contained in the params making the request is the owner of the kitchen
   * @returns {object} response || next
   */

  return KitchenMiddleWareParent;
}(_baseMiddleware2.default);

var KitchenMiddleware = new KitchenMiddleWareParent(_kitchen2.default);
exports.default = KitchenMiddleware;