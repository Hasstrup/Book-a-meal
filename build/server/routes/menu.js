'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _menus = require('../controllers/menus/');

var _menus2 = _interopRequireDefault(_menus);

var _error = require('../middlewares/error/');

var _error2 = _interopRequireDefault(_error);

var _baseMiddleware = require('../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _menu = require('../middlewares/menu');

var _menu2 = _interopRequireDefault(_menu);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* These routes are written with the following assumptions
  1 a menu has many meal options
  2 a menu belongs to a kitchen(caterer);
  3 a kitchen(caterer) has many menus
*/

/*  get the menu of the day;
  this method checks for the kitchen id query key in the request object
  to determine whether to return all the kitchens in the dbs or the ones belonging
  to the subject kitchen
 */

router.get('/', _menus2.default.fetchCatalogue, _error2.default.dispatch);

router.post('/', _baseMiddleware2.default.checkAuthorization, _menu2.default.__filterAccess, _menu2.default.__ensureKitchenOwner, _baseMiddleware2.default.checkForNullInput, _menu2.default.__checkRequired, _menus2.default.setMenuOfTheDay, _error2.default.dispatch);

// get a particular menu; should return the
router.get('/:mmid', _baseMiddleware2.default.__checkParams, _menus2.default.fetchSingle, _error2.default.dispatch);

exports.default = router;