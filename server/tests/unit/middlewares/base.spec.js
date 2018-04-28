import { expect } from 'chai';
import { spy } from 'sinon';
import BaseMiddleware from '../../../middlewares/base-middleware'
import DataHandler from '../../../databases/handler';

let mockRes;
let mockReq
let BaseModel;
let TestMiddleware;
let spy1;
let spy2;

describe('Middleware base class', () => {
  mockRes = {
    json: (obj) => {
      return {
        obj,
        status: stats => stats
      };
    }
  }
  spy1 = spy(mockRes, 'json');
  spy2 = spy();
  before(() => {
    BaseModel = new DataHandler({
      username: String,
      password: String,
      email: String,
      confirmed: true
    }, ['username', 'password', 'email']);
    TestMiddleware = new DataHandler(BaseModel);
  });

  describe('class methods', () => {

    it('checkForNullInput should make sure there is the no response', () => {
      try {
        mockReq = { body: { username: '', password: 'thisisatestpassword' } };
        BaseMiddleware.checkForNullInput(mockReq, mockRes);
        expect(spy1.calledWith(400)).to.be.true;
      } catch (e) {
        expect(e.message).to.equal('Empty value for username');
      }
    });
  });

  it('checkForEmail should skip body if there is no email', () => {
    mockReq = { body: { username: 'bro', password: 'thisisatestpassword' } };
    BaseMiddleware.checkForEmail(mockReq, mockRes, spy2);
    expect(spy1.called).to.be.true;
  });

  it('checkForEmail should fail the body if the email is present and is not email', () => {
    mockReq = { body: { email: 'email', password: 'thisisatestpassword' } };
    BaseMiddleware.checkForEmail(mockReq, mockRes, spy2);
    expect(spy1.called).to.be.true;
  });

  it('checkForEamil should call the next agrs if everything passes', () => {
    mockReq = { body: { email: 'hasstrp.ezekiel@email.com', password:'Hasstrup.ezekiel@gmail' } };
    BaseMiddleware.checkForEmail(mockReq, mockRes, spy2);
    expect(spy2.called).to.be.true;
  });

});
