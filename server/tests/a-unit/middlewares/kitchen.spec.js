import KitchenMiddleware from '../../../middlewares/kitchen';
import { spy } from 'sinon';
import { expect } from 'chai';

let mockReq;
let mockRes;
const spy1 = spy();

describe('Kitchen api middlewares', () => {

  it('revokeAccess should reject requests with a mismatched authorization', () => {
    mockReq = { headers: { authorization: 'this should fail'}, query: { }, params: {ktid: '2'}};
    KitchenMiddleware.revokeAccess(mockReq, mockRes, spy1);
    expect(spy1.called).to.be.true;
  });

  it('restricAccess should reject requests with a mismatching authorization header', () => {
    mockReq = {headers: { authorization: 'thishouldfailtoo'}, query: { } };
    KitchenMiddleware.restrictAccess(mockReq, mockRes, spy1);
    expect(spy1.called).to.be.true;
  });
})
