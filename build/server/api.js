'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _kitchens = require('./routes/kitchens');

var _kitchens2 = _interopRequireDefault(_kitchens);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _meals = require('./routes/meals');

var _meals2 = _interopRequireDefault(_meals);

var _orders = require('./routes/orders');

var _orders2 = _interopRequireDefault(_orders);

var _menu = require('./routes/menu');

var _menu2 = _interopRequireDefault(_menu);

var _baseMiddleware = require('./middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = (0, _express.Router)();

api.get('/heartbeat', function (req, res) {
  return res.send({ ok: true });
}).use('/auth', _auth2.default).use('/users', _baseMiddleware2.default.formatPaginationQuery, _user2.default).use('/kitchens', _baseMiddleware2.default.formatPaginationQuery, _kitchens2.default).use('/meals', _baseMiddleware2.default.formatPaginationQuery, _meals2.default).use('/menus', _baseMiddleware2.default.formatPaginationQuery, _menu2.default).use('/orders', _baseMiddleware2.default.formatPaginationQuery, _orders2.default);

// No routes matched? 404.
api.use(function (req, res) {
  return res.status(404).json({ error: 'Sorry that route/method doesnt exist' });
});

exports.default = api;