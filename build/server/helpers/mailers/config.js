'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sender = { service: 'gmail', auth: { user: 'applicationbookameal@gmail.com', pass: 'bookameal123456' } };
var transporter = _nodemailer2.default.createTransport(sender);
exports.default = transporter;