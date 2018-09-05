'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _auth = require('../../services/auth/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
var source = void 0;
/* eslint func-names: 0, prefer-destructuring: 0, no-underscore-dangle: 0 */

var AuthControllerClass = function (_BaseController) {
  _inherits(AuthControllerClass, _BaseController);

  function AuthControllerClass() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, AuthControllerClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AuthControllerClass.__proto__ || Object.getPrototypeOf(AuthControllerClass)).call.apply(_ref, [this].concat(args))), _this), _this.signUp = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _auth2.default.signUp(req.body);

              case 2:
                data = _context.sent;
                _context.next = 5;
                return _this.__knockOffPassword(data);

              case 5:
                data = _context.sent;

                _this.resourceCreated(res, data);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), next);
    }, _this.authenticate = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _auth2.default.__authenticate(req.body);

              case 2:
                data = _context2.sent;
                _context2.next = 5;
                return _this.__knockOffPassword(data);

              case 5:
                data = _context2.sent;

                _this.returnContent(res, data);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })), next);
    }, _this.__knockOffPassword = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(obj) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                source = {};
                _context3.next = 3;
                return Object.entries(obj).forEach(function (item) {
                  if (item[0] !== 'password') {
                    source['' + item[0]] = item[1];
                  }
                });

              case 3:
                return _context3.abrupt('return', source);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return AuthControllerClass;
}(_baseController2.default);

var AuthController = new AuthControllerClass();

exports.default = AuthController;