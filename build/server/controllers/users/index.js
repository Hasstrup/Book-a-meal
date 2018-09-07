'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _users = require('../../services/users/');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint radix: 0, no-underscore-dangle: 0 */

var data = void 0;

var UserControllerBase = function (_BaseController) {
  _inherits(UserControllerBase, _BaseController);

  function UserControllerBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, UserControllerBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserControllerBase.__proto__ || Object.getPrototypeOf(UserControllerBase)).call.apply(_ref, [this].concat(args))), _this), _this.fetchAll = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (req.populate) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return _users2.default.__fetchAll();

              case 3:
                data = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.next = 8;
                return _users2.default.__fetchAll('populate');

              case 8:
                data = _context.sent;

              case 9:
                _this.responseOkay(res, data);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), next);
    }, _this.fetchSingle = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!req.populate) {
                  _context2.next = 4;
                  break;
                }

                data = _users2.default.__fetchSingle('id', req.params.user_id);
                _context2.next = 7;
                break;

              case 4:
                _context2.next = 6;
                return _users2.default.__fetchOne('id', req.params.user_id, 'populate');

              case 6:
                data = _context2.sent;

              case 7:
                _this.returnContent(res, data);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })), next);
    }, _this.updateOne = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _users2.default.__updateOne('id', req.params.user_id, req.body);

              case 2:
                data = _context3.sent;

                _this.resourceCreated(res, data);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      })), next);
    }, _this.deleteOne = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _users2.default.__deleteOne('id', req.params.user_id);

              case 2:
                _this.returnNoContent(res, 'successfully deleted');

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      })), next);
    }, _this.__confirmEmail = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _users2.default.__confirmEmail(req.query.tk);

              case 2:
                data = _context5.sent;

                _this.returnContent(res, data);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      })), next);
    }, _this.__sendResetPassword = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _users2.default.__sendResetPassword(req.body.email);

              case 2:
                data = _context6.sent;

                if (!data) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', _this.responseMessageAndData(res, data, 'You have been sent the reset password mail'));

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      })), next);
    }, _this.__resetPassword = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _users2.default.__resetPassword(req.query.tk);

              case 2:
                data = _context7.sent;
                return _context7.abrupt('return', _this.returnContent(res, data));

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      })), next);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // lfa feedback


  return UserControllerBase;
}(_baseController2.default);

var UserController = new UserControllerBase();

exports.default = UserController;