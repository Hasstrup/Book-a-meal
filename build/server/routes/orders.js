'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _baseMiddleware = require('../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _orders = require('../middlewares/orders');

var _orders2 = _interopRequireDefault(_orders);

var _auth = require('../middlewares/auth/');

var _auth2 = _interopRequireDefault(_auth);

var _kitchen = require('../middlewares/kitchen/');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _orders3 = require('../controllers/orders');

var _orders4 = _interopRequireDefault(_orders3);

var _meals = require('../middlewares/meals/');

var _meals2 = _interopRequireDefault(_meals);

var _error = require('../middlewares/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* These routes are written with the following assumptions
  1 orders are objects containing meal options, price, vendor and client
  2 Users and kitchens can maintain orders independent of each order;
  3 the routes will use a type & id query keys to determine who is requesting
    a user or kitchen;
  4 type=1 means it's a user's request, type=2 means it's a kitchen's request;
*/

/* this route expects that the request comes
  with a type key indicating whether it's for a user or a kitchen */
router.get('/', _baseMiddleware2.default.checkAuthorization, _orders2.default.__filterAccess, _orders2.default.checkType, _orders4.default.fetchOrders, _error2.default.dispatch);

/* this route is exclusive to only type=user as only users should be able to make new orders */
router.post('/', _baseMiddleware2.default.checkAuthorization, _orders2.default.__filterAccess, _baseMiddleware2.default.checkForNullInput, _orders2.default.__checkRequired, _orders4.default.create, _error2.default.dispatch);

//  this method should only allow kitchens change the processed key from false to true;
router.put('/:ooid', _baseMiddleware2.default.checkAuthorization, _orders2.default.__filterAccess, _orders2.default.checkType, _baseMiddleware2.default.__checkParams, _orders2.default.__revokeAccess, _orders4.default.updateOne, _error2.default.dispatch);

exports.default = router;