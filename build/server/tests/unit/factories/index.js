'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidKitchen = exports.validmenu = exports.validKitchen = exports.invaliduser = exports.validuser = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * User factory
  *@return {Object} An object to build for the user test;
  *@desc
*/

var validuser = exports.validuser = function validuser() {
  return {
    username: _faker2.default.name.firstName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  };
};

var invaliduser = exports.invaliduser = {
  username: 1243,
  password: 124,
  email: 'thisisanemailthatshouldfail'
};

var validKitchen = exports.validKitchen = {
  name: 'Hasstrups Test Kitchen',
  description: 'Hasstrup really likes cool kitchen'
};

var validmenu = exports.validmenu = {
  name: 'This is pretty awesome menu',
  description: 'Do you know how nice this menu is?'
};

var invalidKitchen = exports.invalidKitchen = {
  name: 12,
  description: 123
};