'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _users = require('../controllers/users/');

var _users2 = _interopRequireDefault(_users);

var _baseMiddleware = require('../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _auth = require('../middlewares/auth/');

var _auth2 = _interopRequireDefault(_auth);

var _error = require('../middlewares/error/');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* Simple crud for users, The create functionality is wrapped into the auth module in ./auth.js */

/* eslint no-underscore-dangle: 0 */
router.get('/', _baseMiddleware2.default.checkPopulateQuery, _users2.default.fetchAll, _error2.default.dispatch);

router.get('/:user_id', _baseMiddleware2.default.checkPopulateQuery, _baseMiddleware2.default.__checkParams, _users2.default.fetchSingle, _error2.default.dispatch);

router.get('/confirm/mail', _auth2.default.checkForTokenQuery, _users2.default.__confirmEmail, _error2.default.dispatch);

router.post('/send/reset/password', _baseMiddleware2.default.checkForEmail, _users2.default.__sendResetPassword, _error2.default.dispatch);

router.get('/reset/password', _auth2.default.checkForTokenQuery, _users2.default.__resetPassword, _error2.default.dispatch);

router.put('/:user_id', _baseMiddleware2.default.checkAuthorization, _auth2.default.__filterAccess, _baseMiddleware2.default.__checkParams, _auth2.default.__revokeAccess, _users2.default.updateOne, _error2.default.dispatch);

router.delete('/:user_id', _baseMiddleware2.default.checkAuthorization, _auth2.default.__filterAccess, _baseMiddleware2.default.__checkParams, _auth2.default.__revokeAccess, _users2.default.deleteOne, _error2.default.dispatch);

exports.default = router;