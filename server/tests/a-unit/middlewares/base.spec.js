import { expect } from 'chai';
import { spy } from 'sinon';
import BaseMiddlewareClass from '../../../middlewares/base-middleware';
import DataHandler from '../../../databases/handler';
import Encrypt from '../../../helpers/encrypt/';

let mockRes;
let mockReq;
let BaseModel;
let spy2;
const BaseMiddleware = new BaseMiddlewareClass();

/* eslint no-unused-expressions: 0 */
describe('Middleware base class', () => {
  mockRes = { json: obj => ({ obj, status: stats => stats }) };
  spy2 = spy();

  describe('class methods', () => {
    it('checkForNullInput should make sure there is the no response', () => {
      mockReq = { body: { username: '', password: 'thisisatestpassword' } };
      BaseMiddlewareClass.checkForNullInput(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('checkForEmail should skip body if there is no email', () => {
      mockReq = { body: { username: 'bro', password: 'thisisatestpassword' } };
      BaseMiddlewareClass.checkForEmail(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('checkForEmail should fail the body if the email is present and is not email', () => {
      mockReq = { body: { email: 'email', password: 'thisisatestpassword' } };
      BaseMiddlewareClass.checkForEmail(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('checkForEamil should call the next agrs if everything passes', () => {
      mockReq = { body: { email: 'hasstrp.ezekiel@email.com', password: 'Hasstrup.ezekiel@gmail' } };
      BaseMiddlewareClass.checkForEmail(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('checkPopulate should check the req for the populate args and will pass it on', () => {
      mockReq = { body: { email: 'hasstrp.ezekiel@email.com', password: 'Hasstrup.ezekiel@gmail' }, query: { populate: 'true' } };
      BaseMiddlewareClass.checkPopulateQuery(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });
  });

  describe('BaseMiddleware model specific methods', () => {
    before(() => {
      BaseModel = new DataHandler({
        username: String,
        email: String,
        password: String,
        confirmedMail: Boolean
      }, ['username', 'password', 'email']);
      BaseModel.setMasterKey({ key: 'user_id', type: Number });
      BaseMiddleware.setModel(BaseModel);
    });

    it('checkRequired should ensure the required fields of a model are present', () => {
      mockReq = { body: { username: '', password: 'this is a test password', email: 'anothertestemail' } };
      BaseMiddleware.checkRequired(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('checkRequired should ensure the required fields of a model are present and call next if they are', () => {
      mockReq = { body: { username: 'hasstrupezekiel', password: 'this is a test password', email: 'anothertestemail' } };
      BaseMiddleware.checkRequired(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('checkMasterKey should make sure the query string value is present and matches the type of the id(fail case)', () => {
      mockReq = { body: { username: '', password: 'this is a test password', email: 'anothertestemail' }, query: { user_id: 'wrongType' } };
      BaseMiddleware.checkMasterKey(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('should move on to the next middleware if there is no problem with the query', () => {
      mockReq = { body: { username: '', password: 'this is a test password', email: 'anothertestemail' }, query: { user_id: 'wrongType' } };
      BaseMiddleware.checkMasterKey(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });

    it('AccessControl should forbid requests without the masterKey in the headers', () => {
      mockReq = { headers: { authorization: Encrypt.hashStr(8) }, params: { user_id: 8 } };
      BaseMiddlewareClass.revokeAccess(mockReq, mockRes, spy2);
      expect(spy2.called).to.be.true;
    });
  });
});
