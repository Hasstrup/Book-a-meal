'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _baseMiddleware = require('../../../middlewares/base-middleware');

var _baseMiddleware2 = _interopRequireDefault(_baseMiddleware);

var _handler = require('../../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

var _encrypt = require('../../../helpers/encrypt/');

var _encrypt2 = _interopRequireDefault(_encrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockRes = void 0;
var mockReq = void 0;
var BaseModel = void 0;
var spy2 = void 0;
var BaseMiddleware = new _baseMiddleware2.default();

/* eslint no-unused-expressions: 0 */
describe('Middleware base class', function () {
  mockRes = { json: function json(obj) {
      return { obj: obj, status: function status(stats) {
          return stats;
        } };
    } };
  spy2 = (0, _sinon.spy)();

  describe('class methods', function () {
    it('checkForNullInput should make sure there is the no response', function () {
      mockReq = { body: { username: '', password: 'thisisatestpassword' } };
      _baseMiddleware2.default.checkForNullInput(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('checkForEmail should skip body if there is no email', function () {
      mockReq = { body: { username: 'bro', password: 'thisisatestpassword' } };
      _baseMiddleware2.default.checkForEmail(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('checkForEmail should fail the body if the email is present and is not email', function () {
      mockReq = { body: { email: 'email', password: 'thisisatestpassword' } };
      _baseMiddleware2.default.checkForEmail(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('checkForEamil should call the next agrs if everything passes', function () {
      mockReq = { body: { email: 'hasstrp.ezekiel@email.com', password: 'Hasstrup.ezekiel@gmail' } };
      _baseMiddleware2.default.checkForEmail(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('checkPopulate should check the req for the populate args and will pass it on', function () {
      mockReq = { body: { email: 'hasstrp.ezekiel@email.com', password: 'Hasstrup.ezekiel@gmail' }, query: { populate: 'true' } };
      _baseMiddleware2.default.checkPopulateQuery(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });
  });

  describe('BaseMiddleware model specific methods', function () {
    before(function () {
      BaseModel = new _handler2.default({
        username: String,
        email: String,
        password: String,
        confirmedMail: Boolean
      }, ['username', 'password', 'email']);
      BaseModel.setMasterKey({ key: 'user_id', type: Number });
      BaseMiddleware.setModel(BaseModel);
    });

    it('checkRequired should ensure the required fields of a model are present', function () {
      mockReq = { body: { username: '', password: 'this is a test password', email: 'anothertestemail' } };
      BaseMiddleware.checkRequired(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('checkRequired should ensure the required fields of a model are present and call next if they are', function () {
      mockReq = { body: { username: 'hasstrupezekiel', password: 'this is a test password', email: 'anothertestemail' } };
      BaseMiddleware.checkRequired(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('checkMasterKey should make sure the query string value is present and matches the type of the id(fail case)', function () {
      mockReq = { body: { username: '', password: 'this is a test password', email: 'anothertestemail' }, query: { user_id: 'wrongType' } };
      BaseMiddleware.checkMasterKey(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('should move on to the next middleware if there is no problem with the query', function () {
      mockReq = { body: { username: '', password: 'this is a test password', email: 'anothertestemail' }, query: { user_id: 'wrongType' } };
      BaseMiddleware.checkMasterKey(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });

    it('AccessControl should forbid requests without the masterKey in the headers', function () {
      mockReq = { headers: { authorization: _encrypt2.default.hashStr(8) }, params: { user_id: 8 } };
      _baseMiddleware2.default.revokeAccess(mockReq, mockRes, spy2);
      (0, _chai.expect)(spy2.called).to.be.true;
    });
  });
});