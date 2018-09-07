'use strict';

var _chai = require('chai');

var _kitchen = require('../../../models/v1/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Kitchen model', function () {
  it('should have the following properties', function () {
    (0, _chai.expect)(_kitchen2.default.keys).to.be.an('object');
    (0, _chai.expect)(_kitchen2.default.masterKey).to.be.an('object');
    (0, _chai.expect)(_kitchen2.default.data).to.be.an('object');
    (0, _chai.expect)(_kitchen2.default.data[1].name).to.be.equal('Yet another smaple kitchen');
  });
});