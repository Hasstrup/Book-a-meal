'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validation = require('./auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var data = void 0;

/* eslint class-methods-use-this: 0, no-return-await: 0, prefer-const: 0, no-restricted-globals: 0, no-underscore-dangle: 0 */

var BaseService = function () {
  function BaseService(model, __model) {
    var _this = this;

    _classCallCheck(this, BaseService);

    this.create = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, body) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!id || !body || isNaN(id) || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', _this.badRequest('please pass in the right values :)'));

              case 2:
                data = Object.assign({}, body, { owner: id });
                _context.next = 5;
                return _this.model.create(data);

              case 5:
                return _context.abrupt('return', _context.sent);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    this.fetchOne = function (key, value, populate) {
      _this.checkArguments(key, value, populate);
      var ref = {};
      ref['' + key] = value;
      if (populate && populate === 'populate') {
        return _this.model.findOne(ref, populate);
      }
      return _this.model.findOne(ref);
    };

    this.updateOne = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, value, changes) {
        var ref;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.checkArguments(key, value, changes);

                if (!((typeof changes === 'undefined' ? 'undefined' : _typeof(changes)) !== 'object')) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', _this.unprocessableEntity('Invalid object thrown to the center'));

              case 3:
                ref = {};

                ref['' + key] = value;
                _context2.next = 7;
                return _this.model.findOneAndUpdate(ref, changes);

              case 7:
                return _context2.abrupt('return', _context2.sent);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.deleteOne = function (key, value) {
      _this.checkArguments(key, value);
      var ref = {};
      ref['' + key] = value;
      return _this.model.findOneAndDelete(ref);
    };

    this.__create = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(body) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!body || (typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== 'object')) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', _this.badRequest('please pass in the right values :)'));

              case 2:
                _context3.next = 4;
                return _this.__model.create(body);

              case 4:
                return _context3.abrupt('return', _context3.sent);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x6) {
        return _ref3.apply(this, arguments);
      };
    }();

    this.__fetchAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.__model.findAll({ include: [{ all: true }] });

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    this.__fetchOne = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value) {
        var ref;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.checkArguments(key, value);
                ref = {};

                ref['' + key] = value;
                _context5.next = 5;
                return _this.__model.findOne({ where: ref, include: [{ all: true }] });

              case 5:
                return _context5.abrupt('return', _context5.sent);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }));

      return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }();

    this.__updateOne = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key, value, changes) {
        var ref;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this.checkArguments(key, value, changes);

                if (!((typeof changes === 'undefined' ? 'undefined' : _typeof(changes)) !== 'object')) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt('return', _this.unprocessableEntity('This request is invalid'));

              case 3:
                ref = {};

                ref['' + key] = value;
                _context6.next = 7;
                return _this.__model.findOne({ where: ref });

              case 7:
                data = _context6.sent;
                _context6.next = 10;
                return data.update(changes);

              case 10:
                return _context6.abrupt('return', data);

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }));

      return function (_x9, _x10, _x11) {
        return _ref6.apply(this, arguments);
      };
    }();

    this.__deleteOne = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(key, value) {
        var ref;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this.checkArguments(key, value);
                ref = {};

                ref['' + key] = value;
                _context7.next = 5;
                return _this.__model.findOne({ where: ref });

              case 5:
                data = _context7.sent;
                _context7.next = 8;
                return data.destroy();

              case 8:
                return _context7.abrupt('return', _context7.sent);

              case 9:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this);
      }));

      return function (_x12, _x13) {
        return _ref7.apply(this, arguments);
      };
    }();

    this.throwError = function (message, status) {
      throw new _validation2.default(message, status);
    };

    this.unAuthenticated = function (message) {
      _this.throwError(message, 401);
    };

    this.badRequest = function (message) {
      _this.throwError(message, 400);
    };

    this.noPermissions = function (message) {
      _this.throwError(message, 403);
    };

    this.resourceNotFound = function (message) {
      _this.throwError(message, 404);
    };

    this.model = model;
    this.__model = __model;
  }
  /**
   * create creates a new item in my mock database
   * @param  {Integer}  id   the id of the item
   * @param  {Object}  body body of the item to be created
   * @return {Object}      [description]
   */


  _createClass(BaseService, [{
    key: 'fetchAll',
    value: function fetchAll(populate) {
      if (populate && populate === 'populate') {
        return this.model.getAll('populate');
      }
      return this.model.getAll();
    }
  }, {
    key: 'unprocessableEntity',
    value: function unprocessableEntity(message) {
      this.throwError(message, 422);
    }
  }, {
    key: 'databaseError',
    value: function databaseError(message) {
      this.throwError(message, 409);
    }
  }, {
    key: 'checkArguments',
    value: function checkArguments() {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (params.length < 2 || params.length > 5 || params[0].constructor !== String) {
        return this.badRequest('Please pass in the right arguments');
      }
    }
  }]);

  return BaseService;
}();

exports.default = BaseService;