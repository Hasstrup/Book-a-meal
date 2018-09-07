'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _sequelize = require('sequelize');

var _baseService = require('../base-service');

var _baseService2 = _interopRequireDefault(_baseService);

var _menu = require('../../models/v1/menu');

var _menu2 = _interopRequireDefault(_menu);

var _kitchen = require('../../models/v1/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _kitchens = require('../kitchens');

var _kitchens2 = _interopRequireDefault(_kitchens);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = _relationship2.default.Menu,
    Kitchen = _relationship2.default.Kitchen,
    Meal = _relationship2.default.Meal;


var source = void 0;
var target = void 0;
var data = void 0;
var ref = {};

/* eslint radix: 0, no-underscore-dangle: 0, max-len: 0, no-return-await: 0, arrow-body-style: 0 */

var MenuService = function (_BaseService) {
  _inherits(MenuService, _BaseService);

  function MenuService() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuService);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuService.__proto__ || Object.getPrototypeOf(MenuService)).call.apply(_ref, [this].concat(args))), _this), _this.__fetchCatalogue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Kitchen.findAll();

            case 2:
              data = _context.sent;

              data = data.map(function (kitchen) {
                return kitchen.ofTheDay;
              });
              _context.next = 6;
              return Menu.findAll({ where: { id: _defineProperty({}, _sequelize.Op.in, data) }, include: [Meal, Kitchen] });

            case 6:
              target = _context.sent;
              return _context.abrupt('return', target);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.__setMenuOfTheDay = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(kitchen, menu) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _kitchens2.default.__setMenuOfTheDay('id', kitchen.id, menu);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.fetchCatalogue = function () {
      source = _kitchen2.default.getAll();
      target = source.map(function (kitchen) {
        return _this.model.findOne({ id: parseInt(kitchen.ofTheDay) });
      });
      return target;
    }, _this.fetchSingleMenu = function (key, value) {
      _this.checkArguments(key, value);
      ref['' + key] = value;
      target = _this.model.findOne(ref, 'populate');
      return target;
    }, _this.fetchMeals = function (key, value) {
      _this.checkArguments(key, value);
      ref['' + key] = value;
      return _this._getMeals(ref);
    }, _this._getMeals = function (node) {
      if (!node.meals || node.meals.length < 1) {
        return _this.unprocessableEntity('Sorry theres nothing contained in thie menu');
      }
      return node.meals.map(function (item) {
        return Meals.findOne({ id: '' + item });
      });
    }, _this.setMenuOfTheDay = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key, value, menu, user) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.checkArguments(key, value, menu);
                _context3.next = 3;
                return Menu.create(Object.assign({}, menu, { owner: parseInt(user.kitchen) }));

              case 3:
                data = _context3.sent;
                _context3.next = 6;
                return Kitchen.findOneAndUpdate({ id: parseInt(user.kitchen) }, { ofTheDay: parseInt(data.id) });

              case 6:
                target = _context3.sent;
                return _context3.abrupt('return', Kitchen.findOne({ id: parseInt(target.id) }, 'populate'));

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x3, _x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  // ================== methods that matter in challenge 3 ===================


  // ==================== methods that matter in challenge 2 ====================

  return MenuService;
}(_baseService2.default);

var MenuServiceObject = new MenuService(_menu2.default, Menu);

exports.default = MenuServiceObject;