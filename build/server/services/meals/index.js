'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _meal = require('../../models/v1/meal');

var _meal2 = _interopRequireDefault(_meal);

var _baseService = require('../base-service');

var _baseService2 = _interopRequireDefault(_baseService);

var _kitchen = require('../../models/v1/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Meal = _relationship2.default.Meal;


var data = void 0;
var target = void 0;
var ref = {};
var meals = void 0;
var source = void 0;

/* eslint radix: 0, no-restricted-globals: 0, no-return-await: 0 , no-underscore-dangle: 0, prefer-const: 0, max-len: 0 */

var MealServiceObject = function (_BaseService) {
  _inherits(MealServiceObject, _BaseService);

  function MealServiceObject() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, MealServiceObject);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MealServiceObject.__proto__ || Object.getPrototypeOf(MealServiceObject)).call.apply(_ref, [this].concat(args))), _this), _this._updateKitchen = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, body) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ref.id = id;
                _context.next = 3;
                return _kitchen2.default.findOne(ref);

              case 3:
                target = _context.sent;

                meals = [].concat(_toConsumableArray(target.meals), [body]);
                _context.next = 7;
                return _kitchen2.default.findOneAndUpdate(ref, { meals: meals });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.create = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, body) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!id || !body || isNaN(id) || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', _this.badRequest('please pass in the right values :)'));

              case 2:
                data = Object.assign({}, body, { owner: id });
                _context2.next = 5;
                return _this.model.create(data);

              case 5:
                source = _context2.sent;
                _context2.next = 8;
                return _this._updateKitchen(id, source.id);

              case 8:
                return _context2.abrupt('return', source);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.__create = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(kitchenId, body) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!kitchenId || !body || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object')) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', _this.badRequest('please pass in the right values :)'));

              case 2:
                _context3.next = 4;
                return _this.__model.create(_extends({}, body, { kitchenId: kitchenId }));

              case 4:
                data = _context3.sent;
                return _context3.abrupt('return', data);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.__fetchMealsForKitchen = function (kitchen) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var pagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Meal.findAll(_extends({ where: { kitchenId: kitchen.id }, include: [{ all: true }] }, pagination));

              case 2:
                data = _context4.sent;
                return _context4.abrupt('return', data);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return MealServiceObject;
}(_baseService2.default);

var MealService = new MealServiceObject(_meal2.default, Meal);
exports.default = MealService;