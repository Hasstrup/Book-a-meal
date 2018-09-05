'use strict';

var _chai = require('chai');

var _validation = require('../../../services/auth/errors/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Custom Validation Error', function () {
  var err = new _validation2.default('Unprocessable request', 422);
  it('should have correct messages and status', function () {
    (0, _chai.expect)(err.message).to.equal('Unprocessable request');
    (0, _chai.expect)(err.status).to.equal(422);
  });
});