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

var _sequelize = require('sequelize');

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _this.__mustBelongToKitchenSpecified = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(meals) {
        var formattedQuery, count;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // format the meals to look like this // hopefully this is not too expensive
                formattedQuery = meals.map(function (meal) {
                  return { id: meal.id, kitchenId: meal.kitchenId };
                });
                _context3.next = 3;
                return Meal.count({ where: _defineProperty({}, _sequelize.Op.or, formattedQuery) });

              case 3:
                count = _context3.sent;
                return _context3.abrupt('return', count === formattedQuery.length);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.__create = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId, body) {
        var ref, _ref5, validMeals, filter, targetMeals, meals;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!userId || !body || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object' || !body.meals || body.meals.constructor !== Array) {
                  _this.badRequest('The input isnt complete');
                }
                // assuming there is a list of meals that comes in the body of the request;
                ref = {};
                _context4.next = 4;
                return _this.__mustBelongToKitchenSpecified(body.meals);

              case 4:
                if (_context4.sent) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', _this.badRequest('Sorry looks like some of the meals dont belong to the kitchen specified'));

              case 6:
                ref.status = {};
                body.meals.forEach(function (item) {
                  ref.status['' + item.kitchenId] = false;
                });
                // creating the actual order;
                target = Object.assign({}, ref, { userId: userId });
                _context4.next = 11;
                return _this.__model.create(target);

              case 11:
                data = _context4.sent;

                body.meals = body.meals.map(function (meal) {
                  if (!meal.id || !meal.quantity) {
                    return _this.badRequest('Please pass in the right values for the order, including quantity');
                  }
                  return { orderId: data.id, mealId: meal.id, quantity: meal.quantity };
                });
                // apply a hook here to make sure they are in the menu of the day

                _context4.next = 15;
                return _this.__mustBeInMenuOfTheDay(body.meals);

              case 15:
                _ref5 = _context4.sent;
                validMeals = _ref5.validMeals;
                filter = _ref5.filter;

                if (!(process.env.NODE_ENV !== 'test')) {
                  _context4.next = 21;
                  break;
                }

                if (!filter.length) {
                  _context4.next = 21;
                  break;
                }

                return _context4.abrupt('return', _this.badRequest('Sorry you cannot order meals that are not in the menu of the day'));

              case 21:
                // finally create all the validMeals
                targetMeals = validMeals.length ? validMeals : body.meals;
                _context4.next = 24;
                return MealOrders.bulkCreate(targetMeals);

              case 24:
                _context4.next = 26;
                return data.getMeals();

              case 26:
                meals = _context4.sent;
                return _context4.abrupt('return', Object.assign({}, data.get({ plain: true }), { meals: meals }));

              case 28:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.__mustBeInMenuOfTheDay = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(meals) {
        var catalogue, mealCatalogue, filter, validMeals;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _menu2.default.__fetchCatalogue()();

              case 2:
                catalogue = _context5.sent;
                mealCatalogue = catalogue.reduce(function (a, b) {
                  var mealsIdMap = b.meals.map(function (item) {
                    return item.id;
                  });
                  return [].concat(_toConsumableArray(a), _toConsumableArray(mealsIdMap));
                }, []);


                if (!catalogue.length) _this.badRequest('That order cannot go through, Sorry');
                filter = [];
                validMeals = meals.map(function (meal) {
                  if (mealCatalogue.includes(meal.mealId)) return meal;
                  filter.push(meal);
                  return null;
                }).filter(function (meal) {
                  return meal;
                });
                return _context5.abrupt('return', { filter: filter, validMeals: validMeals });

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.__updateOne = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key, value, Id, type, payload, user) {
        var ref, orders, diff;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this.checkArguments(key, value, Id);
                ref = {};

                ref['' + key] = value;
                _context6.next = 5;
                return Order.findAll({ where: ref });

              case 5:
                orders = _context6.sent;

                data = orders[0];
                if (!data) {
                  _this.unprocessableEntity('Sorry, theres no order matching that criteria');
                }

                if (!(type === 'kitchen')) {
                  _context6.next = 17;
                  break;
                }

                if (Object.keys(data.status).includes(Id)) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt('return', _this.noPermissions(' Sorry your kitchen cant perform this operation'));

              case 11:
                data.status['' + Id] = true;
                _context6.next = 14;
                return data.update({
                  status: data.status
                });

              case 14:
                return _context6.abrupt('return', _extends({}, data.get({ plain: true }), { changedCorrectly: true }));

              case 17:
                if (!(type === 'user')) {
                  _context6.next = 29;
                  break;
                }

                diff = (0, _moment2.default)(Date.now()).diff(data.createdAt, 'minutes');

                if (!(parseInt(diff) > 10 || !payload || !payload.quantity || isNaN(parseInt(payload.quantity)))) {
                  _context6.next = 21;
                  break;
                }

                return _context6.abrupt('return', _this.badRequest('This request is invalid, time for this might have elapsed or bad input'));

              case 21:
                _context6.next = 23;
                return MealOrders.findOne({ where: { orderId: data.id, mealId: Id } });

              case 23:
                target = _context6.sent;

                if (target) {
                  _context6.next = 26;
                  break;
                }

                return _context6.abrupt('return', _this.unprocessableEntity('Sorry we cant find any order matching your criteria'));

              case 26:
                _context6.next = 28;
                return target.update(payload);

              case 28:
                return _context6.abrupt('return', target);

              case 29:
                _this.unprocessableEntity('Please specify who is trying to mutate this object');

              case 30:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x7, _x8, _x9, _x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this.__fetchAll = function (id, type) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var pagination = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this._validateFetchAllArgs(id, type);

                if (!(type === 'kitchen')) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 4;
                return _kitchens2.default.__fetchOrders('id', id)(pagination);

              case 4:
                return _context7.abrupt('return', _context7.sent);

              case 7:
                if (!(type === 'user')) {
                  _context7.next = 11;
                  break;
                }

                _context7.next = 10;
                return _this.__model.findAll(_extends({ where: { userId: id }, include: [Meal] }, pagination));

              case 10:
                return _context7.abrupt('return', _context7.sent);

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      }));
    };

    _this.model = model;
    return _this;
  }

  // updating the model should only set the menu to true;


  // Persistent Methods


  return OrderServiceBase;
}(_baseService2.default);

var OrderService = new OrderServiceBase(_orders2.default, Order);

exports.default = OrderService;