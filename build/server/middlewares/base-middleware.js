'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _encrypt = require('../helpers/encrypt/');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _validation = require('../services/auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

var _relationship = require('../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _relationship2.default.User;


var err = void 0;
var data = void 0;
var allowed = ['password', 'quantity', 'price'];
var valid = true;
var culprit = void 0;

var BaseMiddleware = function () {
  function BaseMiddleware() {
    var _this = this;

    _classCallCheck(this, BaseMiddleware);

    this.__filterAccess = function (req, res, next) {
      _encrypt2.default.decodeToken(req.headers.authorization).then(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.getCurrentUser(payload, next);

                case 2:
                  data = _context.sent;

                  req.user = data.get({ plain: true });
                  req.kitchen = data.Kitchen ? data.Kitchen : null;
                  return _context.abrupt('return', next());

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()).catch(function (err) {
        next(new _validation2.default('Something went wrong trying to grant you access, Token might be deformed', 401));
      });
    };

    this.__ensureKitchenOwner = function (req, res, next) {
      if (!req.kitchen) {
        err = new _validation2.default('Sorry but you need to have a kitchen to perform this action', 403);
        if (next) {
          return next(err);
        }
        return false;
      }
      if (next) {
        return next();
      }
      return true;
    };

    this.getCurrentUser = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
        var id;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = payload.id;

                if (id) {
                  _context2.next = 3;
                  break;
                }

                throw new _validation2.default('That token might be invalid, Please check that again ', 404);

              case 3:
                _context2.next = 5;
                return User.findOne({ where: { id: id }, include: [{ all: true }] });

              case 5:
                data = _context2.sent;

                if (data) {
                  _context2.next = 8;
                  break;
                }

                throw new _validation2.default('Sorry we couldnt find any user matching your criteria', 404);

              case 8:
                return _context2.abrupt('return', data);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.checkRequiredParams = function (req, res, next) {
      var key = _this.model.masterKey.key;

      if (req.params['' + key]) {
        return next();
      }
      err = new Error('A required param is missing');
      err.status = 400;
      return next(err);
    };

    this.checkRequired = function (req, res, next) {
      if (!_this.model) {
        err = new Error('No model present for the checkRequired middleware');
        err.status = 500;
        next(err);
        return;
      }
      data = _this.model.required.map(function (key) {
        if (req.body['' + key] && req.body['' + key].constructor === _this.model.keys['' + key]) {
          return { status: true, key: key };
        } else if (req.body['' + key] && key === 'price' && !isNaN(parseInt(req.body['' + key]))) {
          return { status: true, key: key };
        }
        return { status: false, key: key };
      });

      data = data.filter(function (item) {
        return !item.status;
      });
      if (data.length === 0) {
        return next();
      }
      var string = void 0;
      data.forEach(function (field) {
        string = field.key + ' is missing somewhere in the request body, Please check';
      });

      err = new Error(string);
      err.status = 400;
      return next(err);
    };

    this.checkMasterKey = function (req, res, next) {
      if (!_this.model.masterKey || !_this.model.masterKey.key || !_this.model.masterKey.type) {
        err = new Error('No masterkey set for this model');
        err.status = 500;
        next(err);
      }
      var key = _this.model.masterKey.key;
      var type = _this.model.masterKey.type;
      // check the query for the key && pass the query as req.`${key}`

      if (req.query['' + key] && req.query['' + key].constructor === type) {
        req['' + key] = req.query['' + key];
        return next();
      } else if (req.query['' + key] && type === Number && !isNaN(parseInt(req.query['' + key]))) {
        req['' + key] = req.query['' + key];
        return next();
      }
      err = new Error('There is no identifier for this request at all');
      err.status = 401;
      return next(err);
    };

    this.checkForTokenQuery = function (req, res, next) {
      if (!req.query.tk) {
        err = new Error('There needs to be token for this to work');
        err.status = 403;
        return next(err);
      }
      next();
    };

    this.setModel = function (model) {
      if (!model) {
        throw new Error('The model has to be a DataHandler instance');
      }
      _this.model = model;
    };

    this._checkAuthenticity = function (str1, str2) {
      return str1.toString() === _this.hashString('HellothereKanye' + str2).toString();
    };

    this.hashString = function (str) {
      return _encrypt2.default.hashStr(str);
    };
  }

  _createClass(BaseMiddleware, null, [{
    key: 'checkForNullInput',


    // ================= methods that matter in challenge 3 ===========================


    value: function checkForNullInput(req, res, next) {
      // More specific error messages
      var emptyKey = void 0;
      var body = Object.keys(req.body);
      if (body.length) {
        if (!Object.keys(req.body).some(function (key, index) {
          if (Object.values(req.body)['' + index].toString().length < 1) {
            emptyKey = key;
            return false;
          }return true;
        })) {
          err = new Error('Please check that you filled the form correctly, ' + emptyKey + ' might be empty or invalid');
          err.status = 400;
          return next(err);
        }
        data = Object.values(req.body).filter(function (item) {
          return !isNaN(parseInt(item));
        });
        if (data.length > 0) {
          if (!data.some(function (item) {
            if (item <= 0) {
              return false;
            }
            return true;
          })) {
            err = new Error('Did you enter a number less than 0? Please check');
            err.status = 400;
            return next(err);
          }
        }
        // check string fields for numbers
        Object.keys(req.body).forEach(function (key) {
          if (!isNaN(parseInt(req.body['' + key])) && !allowed.includes(key)) {
            culprit = key;
            valid = false;
          }
        });
        if (!valid) {
          err = new Error('Thats the wrong Datatype for ' + culprit + ', Please change');
          err.status = 422;
          valid = true;
          return next(err);
        }
        // check the price field for the price;
        if (req.body.price) {
          if (isNaN(parseInt(req.body.price))) {
            err = new Error('Please check the data type for price, Should be a number');
            err.status = 422;
            return next(err);
          }
        }
        return next();
      }
      err = new Error('Theres no content in the request body, please fill with all required fields');
      err.status = 400;
      return next(err);
    }

    /* eslint no-restricted-globals: 0, radix: 0 */


    // ================= methods that matter in challenge 2 ===========================
    /**
     *
     */


    /* check if the model is valid and and bind the model to this */

  }]);

  return BaseMiddleware;
}();

BaseMiddleware.checkAuthorization = function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    err = new Error('You need to be authorized to do this, ensure that the token is the value for the authorization field in the request header');
    err.status = 403;
    return next(err);
  }
  return next();
};

BaseMiddleware.__checkParams = function (req, res, next) {
  data = Object.entries(req.params);
  if (data.length === 0) {
    return next();
  }
  if (!data.some(function (item) {
    if ((0, _validator.isUUID)(item[1])) {
      return true;
    }
    culprit = item[0];
    return false;
  })) {
    return next(new _validation2.default('The Datatype for the params (' + culprit + ') sent is incorrect please check again', 400));
  }
  next();
};

BaseMiddleware.checkForEmail = function (req, res, next) {
  try {
    if (req.body.email && req.body.email.toString().length > 1 && (0, _validator.isEmail)(req.body.email)) {
      return next();
    }
    err = new Error('Something might be wrong with the values, check the email please');
    err.status = 400;
    next(err);
  } catch (e) {
    err = new Error('Ensure the email is present and valid for this to work');
    err.status = 422;
    return next(err);
  }
};

BaseMiddleware.checkPopulateQuery = function (req, res, next) {
  if (req.query && req.query.populate && req.query.populate === 'populate') {
    req.populate = true;
    return next();
  }
  return next();
};

BaseMiddleware.revokeAccess = function (req, res, next) {
  var target = Object.keys(req.params)[0];
  if (req.headers.authorization.toString() === _encrypt2.default.hashStr('Hellothere' + req.params['' + target]).toString()) {
    return next();
  }
  err = new Error('You need to be authorized to do this');
  err.status = 403;
  return next(err);
};

BaseMiddleware.restrictAccess = function (req, res, next) {
  var target = Object.keys(req.query)[0];
  if (req.headers.authorization.toString() === _encrypt2.default.hashStr('HellothereKanye' + req.query['' + target]).toString()) {
    return next();
  }
  err = new Error('You need to be authorized to do this');
  err.status = 403;
  return next(err);
};

exports.default = BaseMiddleware;