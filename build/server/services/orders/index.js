'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _baseService = require('../base-service');

var _baseService2 = _interopRequireDefault(_baseService);

var _kitchens = require('../kitchens/');

var _kitchens2 = _interopRequireDefault(_kitchens);

var _menu = require('../menu/');

var _menu2 = _interopRequireDefault(_menu);

var _orders = require('../../models/v1/orders');

var _orders2 = _interopRequireDefault(_orders);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ref = {};
var data = void 0;
var target = void 0;

var Order = _relationship2.default.Order,
    MealOrders = _relationship2.default.MealOrders,
    Meal = _relationship2.default.Meal;
/* eslint no-underscore-dangle: 0, radix: 0, max-len: 0, no-return-await: 0, no-shadow: 0, prefer-const: 0 */

var OrderServiceBase = function (_BaseService) {
  _inherits(OrderServiceBase, _BaseService);

  function OrderServiceBase(model, __model) {
    var _this2 = this;

    _classCallCheck(this, OrderServiceBase);

    var _this = _possibleConstructorReturn(this, (OrderServiceBase.__proto__ || Object.getPrototypeOf(OrderServiceBase)).call(this, model, __model));

    _this._validateFetchAllArgs = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length !== 2 || args[0].constructor !== String) {
        _this.unprocessableEntity('Please specify whose orders to find');
      }
    };

    _this._setProccessedTrue = function (args) {
      if (args.constructor === Object && !args.processed) {
        args.processed = true;
        return args;
      }
      _this.unprocessableEntity('Theres nothing to set :(');
    };

    _this._checkUpdateArgs = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var a = args[0],
          b = args[1],
          c = args[2];

      if (!a || !b || !c || a.constructor !== String || b.constructor !== Number || b.constructor !== Number) {
        _this.unprocessableEntity('Cant complete this operation, the query is wrong');
      }
    };

    _this.fetchAll = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this._validateFetchAllArgs(type, id);

                if (!(type === 'kitchen')) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return _kitchens2.default.fetchOrders('id', parseInt(id));

              case 4:
                data = _context.sent;
                return _context.abrupt('return', data.map(function (item) {
                  return _this.model._populateMain(item);
                }));

              case 8:
                if (!(type === 'user')) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return _this.model.getAll();

              case 11:
                data = _context.sent;

                target = data.filter(function (item) {
                  return item.id === id;
                }).map(function (item) {
                  return _this.model._populateContent(item);
                });
                return _context.abrupt('return', target.map(function (item) {
                  return _this.model._populateMain(item);
                }));

              case 14:
                return _context.abrupt('return', _get(OrderServiceBase.prototype.__proto__ || Object.getPrototypeOf(OrderServiceBase.prototype), 'fetchAll', _this).call(_this, 'populate'));

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.updateOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var _args2, key, value, menuKey, order;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _args2 = _slicedToArray(args, 3), key = _args2[0], value = _args2[1], menuKey = _args2[2];

              _this._checkUpdateArgs(key, value, menuKey);
              ref['' + key] = value;
              order = _this.model.findOne(ref);

              if (!order) {
                _context2.next = 9;
                break;
              }

              _this._setProccessedTrue(order.content['' + menuKey]);
              _context2.next = 8;
              return _this.model.findOneAndUpdate(ref, { content: _extends({}, order.content) });

            case 8:
              return _context2.abrupt('return', _context2.sent);

            case 9:
              // do something if there is no order like that;
              _this.resourceNotFound('We couldnt find any matching order like that');

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    _this.__create = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(UserId, body) {
        var ref, _ref4, validMeals, filter, targetMeals, meals;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!UserId || !body || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object' || !body.meals || body.meals.constructor !== Array) {
                  _this.badRequest('The input isnt complete');
                }
                // assuming there is a list of meals that comes in the body of the request;
                ref = {};

                Object.keys(body).forEach(function (key) {
                  if (key !== 'meals') {
                    ref['' + key] = body['' + key];
                  }
                });

                ref.status = {};
                // map the kitchen into the ref array // so that kitchens are sorted automatically
                body.meals.forEach(function (item) {
                  ref.status['' + item.kitchen] = false;
                });
                // creating the actual order;
                target = Object.assign({}, ref, { UserId: UserId });
                _context3.next = 8;
                return _this.__model.create(target);

              case 8:
                data = _context3.sent;

                // await data.addMeals(body.meals);
                body.meals = body.meals.map(function (meal) {
                  if (!meal.id || !meal.quantity) {
                    return _this.badRequest('Please pass in the right values for the order, including quantity');
                  }
                  return { OrderId: data.id, MealId: meal.id, quantity: meal.quantity };
                });
                // apply a hook here to make sure they are in the menu of the day

                _context3.next = 12;
                return _this.__mustBeInMenuOfTheDay(body.meals);

              case 12:
                _ref4 = _context3.sent;
                validMeals = _ref4.validMeals;
                filter = _ref4.filter;

                if (!(process.env.NODE_ENV !== 'test')) {
                  _context3.next = 18;
                  break;
                }

                if (!filter.length) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt('return', _this.badRequest('Sorry you cannot order meals that are not in the menu of the day'));

              case 18:
                // finally create all the validMeals
                targetMeals = validMeals.length ? validMeals : body.meals;
                _context3.next = 21;
                return MealOrders.bulkCreate(targetMeals);

              case 21:
                _context3.next = 23;
                return data.getMeals();

              case 23:
                meals = _context3.sent;
                return _context3.abrupt('return', Object.assign({}, data.get({ plain: true }), { meals: meals }));

              case 25:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.__mustBeInMenuOfTheDay = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(meals) {
        var catalogue, mealCatalogue, filter, validMeals;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _menu2.default.__fetchCatalogue();

              case 2:
                catalogue = _context4.sent;
                mealCatalogue = catalogue.reduce(function (a, b) {
                  var mealsIdMap = b.Meals.map(function (item) {
                    return item.id;
                  });
                  return [].concat(_toConsumableArray(a), _toConsumableArray(mealsIdMap));
                }, []);


                if (!catalogue.length) _this.badRequest('That order cannot go through, Sorry');
                filter = [];
                validMeals = meals.map(function (meal) {
                  if (mealCatalogue.includes(meal.MealId)) return meal;
                  filter.push(meal);
                  return null;
                }).filter(function (meal) {
                  return meal;
                });
                return _context4.abrupt('return', { filter: filter, validMeals: validMeals });

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }();

    _this.__updateOne = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value, Id, type, payload) {
        var ref, diff;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.checkArguments(key, value, Id);
                ref = {};

                ref['' + key] = value;
                _context5.next = 5;
                return _this.__model.findOne({ where: ref });

              case 5:
                data = _context5.sent;

                if (!data) {
                  _this.unprocessableEntity('Sorry, theres no order matching that criteria');
                }

                if (!(type === 'kitchen')) {
                  _context5.next = 16;
                  break;
                }

                if (Object.keys(data.status).includes(Id)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt('return', _this.noPermissions(' Sorry your kitchen cant perform this operation'));

              case 10:
                data.status['' + Id] = true;
                _context5.next = 13;
                return data.update({
                  status: data.status
                });

              case 13:
                return _context5.abrupt('return', _extends({}, data.get({ plain: true }), { changedCorrectly: true }));

              case 16:
                if (!(type === 'user')) {
                  _context5.next = 28;
                  break;
                }

                diff = (0, _moment2.default)().diff(data.createdAt, 'minutes');

                if (!(parseInt(diff) > 10 || !payload || !payload.quantity || isNaN(parseInt(payload.quantity)))) {
                  _context5.next = 20;
                  break;
                }

                return _context5.abrupt('return', _this.badRequest('This request is invalid, time for this might have elapsed or bad input'));

              case 20:
                _context5.next = 22;
                return MealOrders.findOne({ where: { OrderId: data.id, MealId: Id } });

              case 22:
                target = _context5.sent;

                if (target) {
                  _context5.next = 25;
                  break;
                }

                return _context5.abrupt('return', _this.unprocessableEntity('Sorry we cant find any order matching your criteria'));

              case 25:
                _context5.next = 27;
                return target.update(payload);

              case 27:
                return _context5.abrupt('return', target);

              case 28:
                _this.unprocessableEntity('Please specify who is trying to mutate this object');

              case 29:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x6, _x7, _x8, _x9, _x10) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.__fetchAll = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, type) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this._validateFetchAllArgs(id, type);

                if (!(type === 'kitchen')) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return _kitchens2.default.__fetchOrders('id', id);

              case 4:
                return _context6.abrupt('return', _context6.sent);

              case 7:
                if (!(type === 'user')) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 10;
                return _this.__model.findAll({ where: { UserId: id }, include: [Meal] });

              case 10:
                return _context6.abrupt('return', _context6.sent);

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this.model = model;
    return _this;
  }

  // updating the model should only set the menu to true;


  // Persistent Methods


  return OrderServiceBase;
}(_baseService2.default);

var OrderService = new OrderServiceBase(_orders2.default, Order);

exports.default = OrderService;