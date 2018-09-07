'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _kitchens = require('../../services/kitchens/');

var _kitchens2 = _interopRequireDefault(_kitchens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;

/* eslint radix: 0 */

var KitchenControllerBase = function (_BaseController) {
  _inherits(KitchenControllerBase, _BaseController);

  function KitchenControllerBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, KitchenControllerBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = KitchenControllerBase.__proto__ || Object.getPrototypeOf(KitchenControllerBase)).call.apply(_ref, [this].concat(args))), _this), _this.create = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _kitchens2.default.create(req.user.id, req.body);

              case 2:
                data = _context.sent;

                _this.resourceCreated(res, data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), next);
    }, _this.fetchAll = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!req.populate) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return _kitchens2.default.__fetchAll('populate')(req.paginationQuery);

              case 3:
                _context2.t0 = _context2.sent;
                _context2.next = 9;
                break;

              case 6:
                _context2.next = 8;
                return _kitchens2.default.__fetchAll()(req.paginationQuery);

              case 8:
                _context2.t0 = _context2.sent;

              case 9:
                data = _context2.t0;

                _this.returnContent(res, data);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })), next);
    }, _this.fetchSingle = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!req.populate) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return _kitchens2.default.__fetchOne('id', req.params.ktid, 'populate')(req.paginationQuery);

              case 3:
                _context3.t0 = _context3.sent;
                _context3.next = 9;
                break;

              case 6:
                _context3.next = 8;
                return _kitchens2.default.__fetchOne('id', req.params.ktid, false)(req.paginationQuery);

              case 8:
                _context3.t0 = _context3.sent;

              case 9:
                data = _context3.t0;

                _this.returnContent(res, data);

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      })), next);
    }, _this.updateOne = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _kitchens2.default.__updateOne('id', req.params.ktid, req.body);

              case 2:
                data = _context4.sent;

                _this.resourceCreated(res, data);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      })), next);
    }, _this.deleteOne = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _kitchens2.default.__deleteOne('id', req.params.ktid);

              case 2:
                _this.returnNoContent(res, 'Resource has been successfully deleted');

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      })), next);
    }, _this.fetchOrders = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _kitchens2.default.fetchOrders('id', req.query.ktid)(req.paginationQuery);

              case 2:
                data = _context6.sent;

                _this.returnContent(res, data);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      })), next);
    }, _this.fetchMenus = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _kitchens2.default.fetchMenus('id', parseInt(req.query.ktid))(req.paginationQuery);

              case 2:
                data = _context7.sent;

                _this.returnContent(res, data);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      })), next);
    }, _this.fetchSubscribers = function (req, res, next) {
      _this.wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _kitchens2.default.fetchMenus('id', parseInt(req.query.ktid));

              case 2:
                data = _context8.sent;

                _this.returnContent(res, data);

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      })), next);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return KitchenControllerBase;
}(_baseController2.default);

var KitchenController = new KitchenControllerBase();
exports.default = KitchenController;