'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseMiddleware = require('../base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _meal = require('../../models/v1/meal');

var _meal2 = _interopRequireDefault(_meal);

var _validation = require('../../services/auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

var _kitchen = require('../../models/v1/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Meal = _relationship2.default.Meal;


var source = void 0;
var ref = {};

/* eslint radix: 0, no-underscore-dangle: 0 */

var MealMiddlewareBase = function (_BaseMiddleware) {
  _inherits(MealMiddlewareBase, _BaseMiddleware);

  function MealMiddlewareBase(model) {
    _classCallCheck(this, MealMiddlewareBase);

    var _this = _possibleConstructorReturn(this, (MealMiddlewareBase.__proto__ || Object.getPrototypeOf(MealMiddlewareBase)).call(this));

    _this.__revokeAccess = function (req, res, next) {
      Meal.findOne({ where: { id: req.params.mealId } }).then(function (meal) {
        if (!meal || meal.kitchenId !== req.kitchen.id) {
          return next(new _validation2.default('You do not have permissions to do that', 401));
        }
        return next();
      });
    };

    _this.restrictAccess = function (req, res, next) {
      ref.id = parseInt(req.params.ktid);
      source = _kitchen2.default.findOne(ref);
      if (source && _this._checkAuthenticity(req.headers.authorization, source.caterer)) {
        req.kitchen = source;
        return next();
      }
      return next(new _validation2.default('You do not have permissions to do that', 401));
    };

    _this.revokeAccess = function (req, res, next) {
      var kitchen = req.kitchen;
      var mealId = req.query.mealId;

      if (kitchen && kitchen.meals && kitchen.meals.includes(parseInt(mealId))) {
        return next();
      }
      return next(new _validation2.default('You do not have permissions to do that', 401));
    };

    _this.model = model;
    return _this;
  }

  // ============ methods that matter in challenge 3 ===========

  // ======== methods that matter in challege 2 ==========================

  return MealMiddlewareBase;
}(_baseMiddleware2.default);

var MealMiddleware = new MealMiddlewareBase(_meal2.default);

exports.default = MealMiddleware;