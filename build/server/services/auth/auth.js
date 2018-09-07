'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _baseService = require('../base-service');

var _baseService2 = _interopRequireDefault(_baseService);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _users = require('../users/');

var _users2 = _interopRequireDefault(_users);

var _encrypt = require('../../helpers/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Persistent model
var User = _relationship2.default.User;

var data = void 0;

/* eslint no-underscore-dangle: 0 */

var AuthModuleBase = function (_BaseService) {
  _inherits(AuthModuleBase, _BaseService);

  function AuthModuleBase(model, __model) {
    var _this2 = this;

    _classCallCheck(this, AuthModuleBase);

    var _this = _possibleConstructorReturn(this, (AuthModuleBase.__proto__ || Object.getPrototypeOf(AuthModuleBase)).call(this));

    _this.signUp = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        var baseData, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                baseData = {};

                _this.model.required.forEach(function (key) {
                  if (body['' + key] && JSON.stringify(body['' + key]).split('').length > 0 && body['' + key].constructor === _this.model.keys['' + key]) {
                    return;
                  }
                  _this.unprocessableEntity(key + ' is either missing or invalid');
                });

                if (!(_this.model.keys && _this.model.create)) {
                  _context.next = 13;
                  break;
                }

                Object.keys(_this.model.keys).forEach(function (key) {
                  if (body['' + key] && body['' + key].constructor === _this.model.keys['' + key]) {
                    baseData['' + key] = body['' + key];
                    return;
                  } else if (!body['' + key] && (_this.model.keys['' + key].constructor === Array || _this.model.keys['' + key].constructor === Object)) {
                    if (_this.model.keys['' + key].constructor === Array) {
                      baseData['' + key] = [];
                      return;
                    }
                    baseData['' + key] = null;
                  }
                  baseData['' + key] = null;
                });
                /* eslint no-return-await: 0 */
                _context.next = 7;
                return _this.__model.create(baseData);

              case 7:
                data = _context.sent;

                _users2.default.__sendConfirmMail(data.id, data.email);
                _context.next = 11;
                return _encrypt2.default.issueToken({ id: data.id, confirmedEmail: data.confirmedEmail });

              case 11:
                token = _context.sent;
                return _context.abrupt('return', _extends({}, data.get({ plain: true }), { token: token }));

              case 13:
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);

                if (_context.t0.errors) {
                  if (_context.t0.errors[0].validatorKey === 'not_unique') {
                    _this.databaseError('This ' + _context.t0.errors[0].path + ' is already taken, Sorry');
                  }
                  _this.unprocessableEntity('' + _context.t0.errors[0].message);
                }
                _this.unprocessableEntity('' + _context.t0.message);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 15]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.authenticate = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
        var baseModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.__model;
        var data, target, validuser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* check for missing fields in the user input */
                data = void 0;
                target = void 0;
                validuser = void 0;

                if (!(Object.values(user).length >= 2)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 6;
                return baseModel.findAll();

              case 6:
                data = _context2.sent;

                target = data.filter(function (item) {
                  return item.username === user.username;
                });
                if (target.length < 1) {
                  _this.unprocessableEntity('No record found with such user');
                }
                /* eslint prefer-destructuring: 0 */
                validuser = target[0];

                if (!(validuser.password === user.password)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', true);

              case 12:
                _this.noPermissions('Invalid username and password combination');

              case 13:
                _this.unprocessableEntity('Certain required fields are missing');

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.__authenticate = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
        var dbuser, token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(Object.entries(user).length >= 2)) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 3;
                return _this.__model.findOne({ where: { email: user.email } });

              case 3:
                dbuser = _context3.sent;

                if (dbuser) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', _this.unprocessableEntity('No record found with such user'));

              case 6:
                if (!_encrypt2.default.checkPassword(user.password, dbuser.password)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 9;
                return _encrypt2.default.issueToken({ id: dbuser.id, confirmedEmail: dbuser.confirmedEmail });

              case 9:
                token = _context3.sent;
                return _context3.abrupt('return', _extends({}, dbuser.get({ plain: true }), { token: token }));

              case 11:
                _this.noPermissions('Invalid username and password combination');

              case 12:
                _this.unprocessableEntity('Certain required fields are missing');

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    if (model) {
      _this.model = model;
      _this.__model = __model;
    }
    return _this;
  }

  return AuthModuleBase;
}(_baseService2.default);

var AuthModule = new AuthModuleBase(_user2.default, User);
exports.default = AuthModule;