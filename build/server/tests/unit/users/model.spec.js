'use strict';

var _chai = require('chai');

var _user = require('../../../models/v1/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User Model', function () {
  it('should have the following properties', function () {
    (0, _chai.expect)(_user2.default.constructor).to.equal(_user.UserModel);
    (0, _chai.expect)(_user2.default.keys).to.be.an('object');
    (0, _chai.expect)(_user2.default.required).to.be.an('array');
    (0, _chai.expect)(_user2.default.refs).to.be.an('object');
  });
});