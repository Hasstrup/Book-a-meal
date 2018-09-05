'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _baseMiddleware = require('../base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _user = require('../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthMiddleware = new _baseMiddleware2.default();
AuthMiddleware.setModel(_user2.default);
AuthMiddleware.checkRequiredLogin = function (req, res, next) {
  if (!req.body.email || req.body.email.constructor !== String || !req.body.password || !(0, _validator.isEmail)(req.body.email)) {
    var err = new Error('Something is wrong with the input, check the email & password');
    err.status = 422;
    return next(err);
  }
  return next();
};

AuthMiddleware.__revokeAccess = function (req, res, next) {
  if (req.user.id !== req.params.user_id) {
    var err = new Error('You do not have permissions to complete this action, Sorry');
    err.status = 401;
    return next(err);
  }
  next();
};

exports.default = AuthMiddleware;