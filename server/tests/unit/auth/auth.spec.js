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
    it('should throw an error with incomplete Data', async () => {
      try {
        invalidData = { username: 'hasstrup', email: 'hasstrup.ezekiel@gmail.com' };
        await AuthModule.signUp(invalidData, BaseModel);
      } catch (e) {
        expect(e.status).to.equal(422);
      }
    });
    /* eslint no-unused-expressions: 0 */
    it('should throw an error with a misatched datatype', async () => {
      try {
        invalidData = {
          username: 1,
          password: 'String',
          email: 'h@user.com',
        };
        await AuthModule.signUp(invalidData);
      } catch (e) {
        expect(e).to.exist;
        expect(e.status).to.equal(422);
      }
    });

    it('should return the correct data with the password encrypted(Success case)', async () => {
      try {
        validData = {
          username: 'hasstrupezekielbro',
          password: '123456',
          email: 'hellopaperstack@gmail.com',
          firstname: 'HasstrupEzekiel'
        };
        const newuser = await AuthModule.signUp(validData);
        expect(newuser.username).to.equal('hasstrupezekielbro');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });

  describe('Auth login method', () => {
    before(async () => {
      const test = [
        {
          username: 'hasstrup',
          password: 'Onosetale',
          email: 'hasstrup@gmail.com',
          firstname: 'Hasstrup'
        },
        {
          username: 'chisomezekeil',
          password: 'thisisatestpassword',
          email: 'hasstrup.ezekiel12@gmail.com',
          firstname: 'This is pretty cool'
        }
      ];
      await test.forEach(async (item) => {
        await AuthModule.signUp(item);
      });
    });

    it('should return throw an error when passed an invalid login details', async () => {
      try {
        invalidData = { username: 'hasstrupezekiel', password: 'Onosetale32' };
        await AuthModule.authenticate(invalidData);
      } catch (e) {
        expect(e).to.exist;
        expect(e.status).to.equal(422);
      }
    });

    it('should return the valid user with a valid user', async () => {
      try {
        validData = { email: 'hellopaperstack@gmail.com', password: '123456' };
        const auth = await AuthModule.__authenticate(validData);
        expect(auth).to.be.an('object');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });
});
