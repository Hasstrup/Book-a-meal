'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sequelize = require('sequelize');

var _baseService = require('../base-service');

var _baseService2 = _interopRequireDefault(_baseService);

var _kitchen = require('../../models/v1/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Kitchen = _relationship2.default.Kitchen,
    Menu = _relationship2.default.Menu,
    Order = _relationship2.default.Order,
    Meal = _relationship2.default.Meal,
    User = _relationship2.default.User;


var source = void 0;
var data = void 0;
var dataTree = void 0;
var target = void 0;
var orders = [];
var refs = {};
var mealPresent = false;

/* eslint global-require: 0, class-methods-use-this: 0, prefer-const: 0, no-return-await: 0, no-underscore-dangle: 0, no-restricted-globals: 0, object-curly-newline: 0 */

var KitchenService = function (_BaseService) {
  _inherits(KitchenService, _BaseService);

  function KitchenService() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, KitchenService);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = KitchenService.__proto__ || Object.getPrototypeOf(KitchenService)).call.apply(_ref, [this].concat(args))), _this), _this.create = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, body) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!id || !body || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', _this.badRequest('please pass in the right values :)'));

              case 2:
                data = Object.assign({}, body, { UserId: id });
                _context.next = 5;
                return _this.__model.create(data);

              case 5:
                return _context.abrupt('return', _context.sent);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.fetchAll = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(populate) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(populate && populate === 'populate')) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return _this.__model.findAll({ include: [{ all: true }] });

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
                _context2.next = 6;
                return _this.__model.findAll();

              case 6:
                return _context2.abrupt('return', _context2.sent);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.fetchOne = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key, value, populate) {
        var ref;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.checkArguments(key, value, populate);
                ref = {};

                ref['' + key] = value;

                if (!(populate && populate === 'populate')) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 6;
                return _this.__model.findOne({ where: ref, include: [{ model: Menu, include: [Meal] }, { model: Meal, include: [Menu] }, { model: User }] });

              case 6:
                return _context3.abrupt('return', _context3.sent);

              case 7:
                _context3.next = 9;
                return _this.__model.findOne({ where: ref });

              case 9:
                return _context3.abrupt('return', _context3.sent);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.__fetchOrders = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, value) {
        var ref;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.checkArguments(key, value);
                ref = {};

                ref['' + key] = value;
                _context4.next = 5;
                return _this.__model.findOne({ where: ref });

              case 5:
                target = _context4.sent;
                _context4.next = 8;
                return Order.findAll({ include: { model: Meal, include: [Kitchen] } });

              case 8:
                source = _context4.sent;

                // so source  returns an array of Meals in the Meals field since it's 1:m rel
                dataTree = source.filter(function (order) {
                  return Object.keys(order.status).includes(target.id);
                });
                // remember to filter the order's content
                return _context4.abrupt('return', dataTree);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.__fetchMenus = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value) {
        var ref;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.checkArguments(key, value);
                ref = {};

                ref['' + key] = value;
                _context5.next = 5;
                return _this.__model.findOne({ where: ref, include: [Menu] });

              case 5:
                target = _context5.sent;
                return _context5.abrupt('return', target.Menus);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
      };
    }(), _this._getMenus = function (node) {
      if (!node || (typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
        _this.badRequest('Please send in a correct node');
      }
      source = require('../../databases/data/menu').default;
      data = Object.values(source).filter(function (item) {
        return item.owner === node.id;
      });
      return data;
    }, _this._getOrders = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(node) {
        var final;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                target = Object.values(require('../../databases/data/orders').default);
                _this._getMenus(node).forEach(function (menu) {
                  var ordersC = target.filter(function (order) {
                    return Object.keys(order.content).includes(menu.id.toString());
                  });
                  orders = [].concat(_toConsumableArray(ordersC));
                  return orders;
                });
                // knock off unneccesay detail attached to the order;
                final = orders.map(function (item) {
                  var content = _this._getMenus(node).map(function (menu) {
                    return item.content['' + menu.id];
                  }).filter(function (object) {
                    return object;
                  });
                  return Object.assign({}, item, { content: content });
                });
                return _context6.abrupt('return', final);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x11) {
        return _ref7.apply(this, arguments);
      };
    }(), _this.__updateOne = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(key, value, changes) {
        var ref;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this.checkArguments(key, value, changes);

                if (!((typeof changes === 'undefined' ? 'undefined' : _typeof(changes)) !== 'object')) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt('return', _this.unprocessableEntity('Invalid object thrown to the center'));

              case 3:
                ref = {};

                ref['' + key] = value;
                _context7.next = 7;
                return _this.__model.findOne({ where: ref });

              case 7:
                data = _context7.sent;
                _context7.next = 10;
                return data.update(changes);

              case 10:
                return _context7.abrupt('return', _context7.sent);

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      }));

      return function (_x12, _x13, _x14) {
        return _ref8.apply(this, arguments);
      };
    }(), _this.__deleteOne = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(key, value) {
        var ref;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this.checkArguments(key, value);
                ref = {};

                ref['' + key] = value;
                _context8.next = 5;
                return _this.__model.findOne({ where: ref });

              case 5:
                data = _context8.sent;
                _context8.next = 8;
                return data.destroy();

              case 8:
                return _context8.abrupt('return', _context8.sent);

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      }));

      return function (_x15, _x16) {
        return _ref9.apply(this, arguments);
      };
    }(), _this.setMenuOfTheDay = function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(key, value, newMenu) {
        var ref;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this.checkArguments(key, value);
                // check the owner;
                ref = {};

                ref['' + key] = value;
                refs.id = newMenu.ofTheDay;
                data = Menu.findOne(refs);
                target = _this.model.findOne(ref);

                if (!(data && target && data.owner === target.id)) {
                  _context9.next = 10;
                  break;
                }

                _context9.next = 9;
                return _this.model.findOneAndUpdate(ref, newMenu);

              case 9:
                return _context9.abrupt('return', _context9.sent);

              case 10:
                _this.noPermissions('You do not have permissions to do that');

              case 11:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this2);
      }));

      return function (_x17, _x18, _x19) {
        return _ref10.apply(this, arguments);
      };
    }(), _this.__setMenuOfTheDay = function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(key, value, newMenu) {
        var ref, meals;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this.checkArguments(key, value);
                ref = {};

                ref['' + key] = value;

                // find the kitchen
                _context11.next = 5;
                return _this.__model.findOne({ where: ref });

              case 5:
                source = _context11.sent;

                if (!source) {
                  _context11.next = 15;
                  break;
                }

                data = {};
                // filter out the unique fields to avoid a conflict when it tries to create;
                Object.keys(newMenu).forEach(function (item) {
                  var arr = ['id', 'createdAt', 'updatedAt', 'meals'];
                  if (!arr.includes(item)) {
                    data['' + item] = newMenu['' + item];
                  }
                });

                // the meals will be an array of meal objects // check the meals to see if the kitchen is the owner;
                if (newMenu.meals) {
                  meals = newMenu.meals;

                  meals.forEach(function (meal) {
                    var KitchenId = meal.KitchenId;

                    if (KitchenId !== source.id) {
                      var err = void 0;
                      err = new Error('You do not own this meal : ' + meal.name);
                      err.status = 401;
                      throw err;
                    }
                    mealPresent = true;
                  });
                }

                // Try finding or creating the menu;
                _context11.next = 12;
                return Menu.findOrCreate({
                  where: { name: data.name, KitchenId: source.id },
                  defaults: _extends({}, data, { KitchenId: source.id })
                }).spread(function () {
                  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(menu) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (!mealPresent) {
                              _context10.next = 4;
                              break;
                            }

                            newMenu.meals = newMenu.meals.map(function (meal) {
                              return meal.id;
                            });
                            _context10.next = 4;
                            return Meal.update({ MenuId: menu.id }, { where: { id: _defineProperty({}, _sequelize.Op.in, newMenu.meals), KitchenId: source.id } });

                          case 4:
                            _context10.next = 6;
                            return source.update({ ofTheDay: menu.id });

                          case 6:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this2);
                  }));

                  return function (_x23) {
                    return _ref12.apply(this, arguments);
                  };
                }());

              case 12:
                _context11.next = 14;
                return source.getMenuOfTheDay();

              case 14:
                return _context11.abrupt('return', _context11.sent);

              case 15:
                // throw an error if there is no kitchen like that
                _this.unprocessableEntity('Sorry we couldnt find any kitchen like that');

              case 16:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this2);
      }));

      return function (_x20, _x21, _x22) {
        return _ref11.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  // The logic should be to fetch all the orders and include


  /* eslint max-len: 0 */


  return KitchenService;
}(_baseService2.default);

var KitchenServiceObject = new KitchenService(_kitchen2.default, Kitchen);

exports.default = KitchenServiceObject;