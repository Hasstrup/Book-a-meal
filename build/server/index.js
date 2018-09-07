'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _sync = require('./models/v2/sync');

var _sync2 = _interopRequireDefault(_sync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var PORT = process.env.PORT || 3900;
var app = (0, _express2.default)();

// sync()
// .then(() => {
//   console.log('DB is done syncing')
// })

app.use(_bodyParser2.default.urlencoded({ extended: true })).use(_bodyParser2.default.json()).use((0, _cors2.default)()).use((0, _morgan2.default)('dev'))
// api versioning;
.use(_express2.default.static('public')).use('/api/v1', _api2.default).get('/*', function (_, res) {
  return res.sendFile(_path2.default.join(__dirname + '/public/index.html'));
}).listen(PORT, function () {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: 0 */
    console.log('The Dev server is running on port ' + PORT);
  } else {
    console.log('The production server is now running at ' + PORT);
  }
});

exports.default = app;