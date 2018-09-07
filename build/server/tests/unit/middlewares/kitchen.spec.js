'use strict';

var _kitchen = require('../../../middlewares/kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _sinon = require('sinon');

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockReq = void 0;
var mockRes = void 0;
var spy1 = (0, _sinon.spy)();

describe('Kitchen api middlewares', function () {

  it('revokeAccess should reject requests with a mismatched authorization', function () {
    mockReq = { headers: { authorization: 'this should fail' }, query: {}, params: { ktid: '2' } };
    _kitchen2.default.revokeAccess(mockReq, mockRes, spy1);
    (0, _chai.expect)(spy1.called).to.be.true;
  });

  it('restricAccess should reject requests with a mismatching authorization header', function () {
    mockReq = { headers: { authorization: 'thishouldfailtoo' }, query: {} };
    _kitchen2.default.restrictAccess(mockReq, mockRes, spy1);
    (0, _chai.expect)(spy1.called).to.be.true;
  });
});