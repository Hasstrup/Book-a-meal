import { expect } from 'chai';
import models from '../../../models/relationship';
import { validuser, invaliduser } from '../factories/';

const { User } = models;

let data;
let res;

/* eslint no-unused-expressions: 0, no-return-await: 0, object-curly-newline: 0 */
describe('User model POSTGRES', () => {

  before(async () => {
    // drop all the data in the table;
    return await User.sync({ force: true });
  });

  describe('Create Functions', () => {

    it('Should successfully create a user into with valid input', async () => {
      data = await User.create(validuser());
      expect(data.username).to.exist;
      expect(data.id).to.be.a('string');
    });

    it('Should reject invalid user input', async () => {
      try {
        return await User.create(invaliduser);
      } catch (e) {
        expect(e).to.exist;
      }
    });

    describe('Testing unique fields', async () => {
      before(async () => {
        res = { username: 'hasstrupezekiel', firstname: 'Hasstrup', lastname: 'Onosetale32', email: 'hasstrup.ezekiel@gmail.com', password: '123456' };
        return await User.create(res);
      });

      it('Should reject creation of a user with the same username', async () => {
        try {
          res = { username: 'hasstrupezekiel', email: 'hass@gmail.com', password: 'testpassword' };
          return await User.create(res);
        } catch (e) {
          expect(e).to.exist;
        }
      });

      it('Should reject creation of a user with the same email', async () => {
        try {
          res = { username: 'hasstrupeze', email: 'hasstrup.ezekiel@gmail.com', password: '123456' };
          return await User.create(res);
        } catch (e) {
          expect(e).to.exist;
        }
      });
    });
  });
});
