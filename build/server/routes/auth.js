'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../middlewares/auth/');

var _auth2 = _interopRequireDefault(_auth);

var _auth3 = require('../controllers/auth/');

var _auth4 = _interopRequireDefault(_auth3);

var _error = require('../middlewares/error/');

var _error2 = _interopRequireDefault(_error);

var _baseMiddleware = require('../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/signup', _baseMiddleware2.default.checkForNullInput, _auth2.default.checkRequired, _baseMiddleware2.default.checkForEmail, _auth4.default.signUp, _error2.default.dispatch);

router.post('/login', _baseMiddleware2.default.checkForNullInput, _auth2.default.checkRequiredLogin, _auth4.default.authenticate, _error2.default.dispatch);

exports.default = router;