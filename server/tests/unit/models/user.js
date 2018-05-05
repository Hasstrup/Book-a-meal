import { expect } from 'chai'
import  User from '../../../models/user';
import { validuser } from '../factories/';

let data;
let res;

/**
  * Test for user model
  @classdesc This is a test for the user model.
              We are testing all the functions of the basic CRUD functions of the model
*/

//
describe('User model POSTGRES', () => {
  it('should successfully create a user and cast it to the DB', async () => {
    res = await User.create(validuser());
    expect(res.username).to.exist;
    expect(res.username).to.exist;
  });
})
