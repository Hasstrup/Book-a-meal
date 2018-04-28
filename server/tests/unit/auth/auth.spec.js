import 'babel-polyfill';
import { expect } from 'chai';
import AuthModule from '../../../services/auth/auth';
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

    it('should return the correct data with the password encrypted(Success case)', async () => {
      try {
        validData = {
          username: 'hasstrupezekiel',
          password: '123456',
          email: 'hasstrup.ezekiel@gmail.com'
        };
        const newuser = await AuthModule.signUp(validData, BaseModel);
        expect(newuser.kitchen).to.be.null;
        expect(newuser.username).to.equal('hasstrupezekiel');
      } catch (e) {
        console.log(e)
      }
    });
  });

  describe('Auth login method', () => {

    before(() => {
      const test = [
        {
          username: 'hasstrup',
          password: 'Onosetale',
          email: 'hasstrup@gmail.com'
        },
        {
          username: 'chisomezekeil',
          password: 'thisisatestpassword',
          email: 'hasstrup.ezekiel@gmail.com'
        }
      ];
      test.forEach(async (item) => {
        await BaseModel.create(item);
      });
    });

    it('should return throw an error when passed an invalid login details', () => {
      try {
        invalidData = { username: 'hasstrupezekiel', password: 'Onosetale32' };
        return AuthModule.authenticate(invalidData, BaseModel);
      } catch (e) {
        expect(e).to.exist;
        expect(e.status).to.equal(403);
      }
    });

    it('should return the valid user with a valid user', () => {
      try {
        validData = { username: 'hasstrup', password: 'Onosetale' };
        const auth = AuthModule.authenticate(validData, BaseModel);
        expect(auth).to.be.true;
      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });
});
