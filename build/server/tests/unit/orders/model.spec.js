'use strict';

var _chai = require('chai');

var _orders = require('../../../models/v1/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = void 0;
describe('Orders model', function () {
  it('should have the following properties', function () {
    (0, _chai.expect)(_orders2.default.data).to.be.an('object');
    (0, _chai.expect)(_orders2.default.keys).to.be.an('object');
  });

  it('_populate content should return the populated items in the order', function () {
    var mock = { content: { 1: { items: [1, 3, 4], processed: true } } };
    data = _orders2.default._populateContent(mock);
    (0, _chai.expect)(data.content['' + 1].items[0]).to.be.an('object');
    (0, _chai.expect)(data.content['' + 1].items[1]).to.be.an('object');
    (0, _chai.expect)(data.content['' + 1].items[0].name).to.equal('Fried Rice and Menu');
    (0, _chai.expect)(data.content['' + 1].items[1].name).to.equal('Fried Rice and Menu & what not');
  });
});