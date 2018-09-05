'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var options = void 0;

var dispatch = function dispatch(body) {
  var message = body.message,
      destination = body.destination,
      subject = body.subject;

  options = { from: 'Book A Meal <noreply@Bookameal.com>', to: destination, text: message, html: message, subject: subject };
  _config2.default.sendMail(options, function (e) {
    if (e) {
      console.log(e);
    }
    console.log('mail sent to ' + destination);
  });
};

var mailers = { dispatch: dispatch };
exports.default = mailers;
/* eslint object-curly-newline: 0 */