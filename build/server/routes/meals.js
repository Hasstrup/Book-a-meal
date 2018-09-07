'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _baseMiddleware = require('../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _meals = require('../middlewares/meals/');

var _meals2 = _interopRequireDefault(_meals);

var _kitchen = require('../middlewares/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _meals3 = require('../controllers/meals/');

var _meals4 = _interopRequireDefault(_meals3);

var _error = require('../middlewares/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* get all the menus in the directory
  check if there is a kitchen querystring to return
  all the meals of a kitchen
*/

/* get a particular meal */
router.get('/', _baseMiddleware2.default.checkAuthorization, _meals2.default.__filterAccess, _meals2.default.__ensureKitchenOwner, _meals4.default.fetchMealsForKitchen, _error2.default.dispatch);

router.get('/:mealId', _meals2.default.checkRequiredParams, _baseMiddleware2.default.__checkParams, _meals4.default.fetchSingle, _error2.default.dispatch);

/* check the query string for kitchen and create the new meal, reject if none */
router.post('/', _baseMiddleware2.default.checkAuthorization, _meals2.default.__filterAccess, _meals2.default.__ensureKitchenOwner, _baseMiddleware2.default.checkForNullInput, _meals2.default.checkRequired, _meals4.default.create, _error2.default.dispatch);

router.put('/:mealId', _baseMiddleware2.default.checkAuthorization, _meals2.default.__filterAccess, _meals2.default.__ensureKitchenOwner, _baseMiddleware2.default.__checkParams, _meals2.default.__revokeAccess, _meals4.default.updateContent, _error2.default.dispatch);

/* check the request for the kitchen query, reject request
if null or it doesnt match the owner of the item */
router.delete('/:mealId', _baseMiddleware2.default.checkAuthorization, _meals2.default.__filterAccess, _meals2.default.__ensureKitchenOwner, _baseMiddleware2.default.__checkParams, _meals2.default.__revokeAccess, _meals4.default.deleteContent, _error2.default.dispatch);

exports.default = router;