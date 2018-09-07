'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _menu = require('../../models/v1/menu');

var _menu2 = _interopRequireDefault(_menu);

var _baseMiddleware = require('../base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

var _validation = require('../../services/auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var target = void 0;
var stats = void 0;
var ref = {};
var Menu = _relationship2.default.Menu;

var culprit = void 0;

var MenuMiddlewareBase = function (_BaseMiddleware) {
  _inherits(MenuMiddlewareBase, _BaseMiddleware);

  function MenuMiddlewareBase(model) {
    _classCallCheck(this, MenuMiddlewareBase);

    var _this = _possibleConstructorReturn(this, (MenuMiddlewareBase.__proto__ || Object.getPrototypeOf(MenuMiddlewareBase)).call(this));

    _this.__revokeAccess = function (req, res, next) {
      if (!req.kitchen) {
        return next(new _validation2.default('You do not have a kitchen, please set up one', 409));
      }
      Menu.findOne({ where: { id: req.params.mmid } }).then(function (meal) {
        if (!meal || meal.Kitchen === req.kitchen.id) {
          return next(new _validation2.default('You do not have permissions to do that', 401));
        }
        return next();
      });
    };

    _this.__checkRequired = function (req, res, next) {
      if (!req.body.meals || req.body.meals.constructor !== Array) {
        return next(new _validation2.default('Please ensure that the request has a meals array field in its body', 400));
      }
      // check that the object contained in the meals is valid and all of that;
      if (!req.body.meals.some(function (mealObject) {
        if (mealObject.constructor !== Object || !mealObject.id || !(0, _validator.isUUID)(mealObject.id)) {
          return false;
        }
        return true;
      })) {
        return next(new _validation2.default('Hey, Please check that you sent the right data in the meals field', 400));
      }
      // check for unique keys in meals input;
      target = req.body.meals.map(function (item) {
        stats = req.body.meals.filter(function (meal) {
          return meal.id === item.id;
        });
        return stats.length;
      }).filter(function (count) {
        return count > 1;
      });

      if (target.length > 0) {
        return next(new _validation2.default('There might be duplicate keys in the meals field, check Please', 400));
      }
      return next();
    };

    _this.revokeAccess = function (req, res, next) {
      ref.id = parseInt(req.query.uuid);
      target = _user2.default.findOne(ref);
      if (!target || !target.kitchen || !_this._checkAuthenticity(req.headers.authorization, target.kitchen)) {
        return next(new _validation2.default('You do not have permissions to do that', 401));
      }
      req.user = target;
      return next();
    };

    _this.model = model;
    return _this;
  }

  // ================  methods that matter in challenge 3 ========================


  // ==============  methods that matter in challenge 2 ========================

  /* eslint max-len: 0, radix: 0, no-underscore-dangle: 0 */


  return MenuMiddlewareBase;
}(_baseMiddleware2.default);

var MenuMiddleware = new MenuMiddlewareBase(_menu2.default);
exports.default = MenuMiddleware;