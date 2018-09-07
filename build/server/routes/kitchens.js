'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _baseMiddleware = require('../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _kitchen = require('../controllers/kitchen/');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _kitchen3 = require('../middlewares/kitchen');

var _kitchen4 = _interopRequireDefault(_kitchen3);

var _error = require('../middlewares/error/');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */
var router = (0, _express.Router)();

router.get('/', _baseMiddleware2.default.checkPopulateQuery, _kitchen2.default.fetchAll, _error2.default.dispatch);

router.get('/:ktid', _baseMiddleware2.default.checkPopulateQuery, _baseMiddleware2.default.__checkParams, _kitchen2.default.fetchSingle, _error2.default.dispatch);

router.post('/', _baseMiddleware2.default.checkAuthorization, _kitchen4.default.__filterAccess, _baseMiddleware2.default.checkForNullInput, _kitchen4.default.checkRequired, _kitchen2.default.create, _error2.default.dispatch);

router.put('/:ktid', _baseMiddleware2.default.checkAuthorization, _kitchen4.default.__filterAccess, _baseMiddleware2.default.__checkParams, _kitchen4.default.__revokeAccess, _baseMiddleware2.default.checkForNullInput, _kitchen2.default.updateOne, _error2.default.dispatch);

router.delete('/:ktid', _baseMiddleware2.default.checkAuthorization, _kitchen4.default.__filterAccess, _baseMiddleware2.default.__checkParams, _kitchen4.default.__revokeAccess, _kitchen2.default.deleteOne, _error2.default.dispatch);

exports.default = router;