'use strict';

var _chai = require('chai');

var _menu = require('../../../models/v1/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Menu model', function () {
  it('should contain the following properties', function () {
    (0, _chai.expect)(_menu2.default.data).to.be.an('object');
    (0, _chai.expect)(_menu2.default.data[5].name).to.equal('Fried rice and Five fish');
    (0, _chai.expect)(_menu2.default.masterKey.key).to.equal('mmid');
  });
});