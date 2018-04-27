import 'babel-polyfill';
import { expect } from 'chai';
import AuthModule from '../../../services/auth/auth'
import DataHandler from '../../../databases/handler';

const BaseModel = new DataHandler({
  username: String,
  password: String,
  firstname: String,
  email: String,
  kitchen: Number,
}, ['username', 'email', 'password']);

let invalidData;
let validData;

describe('Authentication Module', () => {
  describe('Auth sign up method  cases', () => {

    it('should throw an error with incomplete Data', () => {
      try {
        invalidData = { username: 'hasstrup', email: 'hasstrup.ezekiel@gmail.com' };
        AuthModule.signUp(invalidData, BaseModel);
      } catch (e) {
        expect(e.status).to.equal(422);
      }
    });

    it('should throw an error with a misatched datatype', () => {
      try {
        invalidData = {
          username: 1,
          password: 'String',
          email: 'h@user.com',
        };
        AuthModule.signUp(invalidData, BaseModel);
      } catch (e) {
        expect(e).to.exist;
        expect(e.status).to.equal(422);
      }
    });

    it('should return the correct data with the password encrypted', () => {
      validData = {
        username: 'hasstrupezekiel',
        password: '123456',
        email: 'hasstrup.ezekiel@gmail.com'
      };
      const newuser = AuthModule.signUp(validData, BaseModel);
      expect(newuser.kitchen).to.be.null;
      expect(newuser.username).to.equal('hasstrupezekiel');
    });
  });
});
