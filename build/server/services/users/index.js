'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _baseService = require('../base-service');

var _baseService2 = _interopRequireDefault(_baseService);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

var _relationship = require('../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _encrypt = require('../../helpers/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _mailers = require('../../helpers/mailers/');

var _mailers2 = _interopRequireDefault(_mailers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dispatch = _mailers2.default.dispatch;
var User = _relationship2.default.User;


var subject = void 0;
var message = void 0;
var destination = void 0;

var ref = {};
var data = void 0;
var basePath = 'http://my-book-a-meal-app.herokuapp.com/api/v1/users/reset/password/';
var confirmMailPath = 'http://my-book-a-meal-app.herokuapp.com/api/v1/users/confirm/mail';

var UserService = function (_BaseService) {
  _inherits(UserService, _BaseService);

  function UserService(model, __model) {
    var _this2 = this;

    _classCallCheck(this, UserService);

    var _this = _possibleConstructorReturn(this, (UserService.__proto__ || Object.getPrototypeOf(UserService)).call(this));

    _this.fetchAll = function (populate) {
      if (populate && populate === 'populate') {
        return _this.model.getAll('populate');
      }
      return _this.model.getAll();
    };

    _this.fetchSingle = function (key, value, populate) {
      if (!key || !value || typeof key !== 'string') {
        return _this.badRequest('please send in a key of type string and a value');
      }
      ref['' + key] = parseInt(value);
      if (populate && populate === 'populate') {
        return _this.model.findOne(ref, 'populate');
      }
      return _this.model.findOne(ref);
    };

    _this.__resetPassword = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
        var _ref2, id, resetPasswordCount;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!token) {
                  _this.badRequest('Sorry there needs to be a token to proceed');
                }
                _context.next = 4;
                return _encrypt2.default.decodeToken(token);

              case 4:
                _ref2 = _context.sent;
                id = _ref2.id;
                resetPasswordCount = _ref2.resetPasswordCount;
                _context.next = 9;
                return _this.__model.findOne({ where: { id: id } });

              case 9:
                data = _context.sent;

                if (!(!data || data.resetPasswordCount !== resetPasswordCount)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', _this.badRequest('Sorry this token is expired or has invalid content'));

              case 12:
                resetPasswordCount += 1;
                _context.next = 15;
                return data.update({ resetPasswordCount: resetPasswordCount });

              case 15:
                return _context.abrupt('return', data);

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);

                _this.badRequest(_context.t0.message);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 18]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.__sendResetPassword = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
        var tk, link, body;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.__model.findOne({ where: { email: email } });

              case 2:
                data = _context2.sent;

                if (!data) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 6;
                return _encrypt2.default.issueToken({ id: data.id, resetPasswordCount: data.resetPasswordCount });

              case 6:
                tk = _context2.sent;
                link = basePath + '?tk=' + tk;

                message = '<h2> Hello, Yes we understand </br> Please click this link to reset your password <br /> ' + link + ' </h2>';
                subject = 'Reset Password';
                destination = email;
                body = { message: message, destination: destination, subject: subject };

                dispatch(body);
                return _context2.abrupt('return', tk);

              case 14:
                return _context2.abrupt('return', _this.noPermissions('Sorry we cant find that user'));

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.__confirmEmail = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token) {
        var _ref5, id, _data, confirmedEmail;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (!token) {
                  _this.badRequest('Sorry there needs to be a token to proceed');
                }
                _context3.next = 4;
                return _encrypt2.default.decodeToken(token);

              case 4:
                _ref5 = _context3.sent;
                id = _ref5.id;
                _context3.next = 8;
                return _this.__model.findOne({ where: { id: id } });

              case 8:
                data = _context3.sent;

                if (data) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt('return', _this.badRequest('Sorry that token doesnt contain a valid user'));

              case 11:
                _data = data, confirmedEmail = _data.confirmedEmail;

                if (!confirmedEmail) {
                  _context3.next = 14;
                  break;
                }

                return _context3.abrupt('return', _this.badRequest('Seems like youve confirmed your email prior to now'));

              case 14:
                _context3.next = 16;
                return data.update({ confirmedEmail: true });

              case 16:
                return _context3.abrupt('return', _context3.sent);

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3['catch'](0);

                _this.badRequest(_context3.t0.message);

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[0, 19]]);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.__sendConfirmMail = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, email) {
        var token, path, body;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _encrypt2.default.issueToken({ id: id });

              case 2:
                token = _context4.sent;
                path = confirmMailPath + '?tk=' + token;

                message = '<h2> Hello, Welcome to BookAMeal </br> Please click this link to confirm your mail <br/> ' + path + ' </h2>';
                subject = 'Confirm YourEmail';
                destination = email;
                body = { message: message, destination: destination, subject: subject };

                dispatch(body);
                return _context4.abrupt('return', token);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x4, _x5) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.updateOne = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value, changes) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!key || !value || typeof key !== 'string' || (typeof changes === 'undefined' ? 'undefined' : _typeof(changes)) !== 'object')) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', _this.badRequest('Please send in the right input values'));

              case 2:
                ref['' + key] = value;
                _context5.next = 5;
                return _this.model.findOneAndUpdate(ref, changes);

              case 5:
                return _context5.abrupt('return', _context5.sent);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x6, _x7, _x8) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this.deleteOne = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key, value) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!key || !value || typeof key !== 'string')) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return', _this.badRequest('Please send in the right input values'));

              case 2:
                ref['' + key] = value;
                _context6.next = 5;
                return _this.model.findOneAndDelete(ref);

              case 5:
                return _context6.abrupt('return', _context6.sent);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x9, _x10) {
        return _ref8.apply(this, arguments);
      };
    }();

    _this.model = model;
    _this.__model = __model;
    return _this;
  }

  /* eslint no-return-await: 0 */


  return UserService;
}(_baseService2.default);

var UserServiceObject = new UserService(_user2.default, User);

exports.default = UserServiceObject;