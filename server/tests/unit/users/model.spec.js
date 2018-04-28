import { expect } from 'chai';
import User, { UserModel } from '../../../models/v1/user';

describe('User Model', () => {
  it('should have the following properties', () => {
    expect(User.constructor).to.equal(UserModel);
    expect(User.keys).to.be.an('object');
    expect(User.required).to.be.an('array');
    expect(User.refs).to.be.an('object');
  });
});
