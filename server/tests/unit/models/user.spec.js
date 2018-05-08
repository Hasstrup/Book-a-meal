import { expect } from 'chai';
import models from '../../../models/v2/relationship';
import { validuser, invaliduser } from '../factories/';

const { User, Kitchen } = models;

let data;
let res;
let id;

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
        data = await User.create(res);
        // ignoring destructuring to preserve reference in lower scope;
        /* eslint prefer-destructuring: 0 */
        id = data.id
      });

      it('Should reject creation of a user with the same username', async () => {
        try {
          res = { username: 'hasstrupezekiel', email: 'hass@gmail.com', password: 'testpassword' };
          return await User.create(res);
        } catch (e) {
          console.log(e.errors[0].message)
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

  describe('Relationships of a User', () => {
    before(async () => {
      // create a kitchen with the id of user hasstrupezekiel;
      // first of all update the db
      await Kitchen.sync({ force: true });
      res = await Kitchen.create({
        name: 'This is Hasstrups test kitchen',
        description: 'Here is a test description for all my kicthens',
        UserId: id
      });
    });

    it('User hasstrup ezekiel should be able to get his kitchen', async () => {
      data = await User.findOne({ where: { username: 'hasstrupezekiel' }, include: [Kitchen] });
      expect(data.Kitchen).to.be.an('object');
      expect(data.Kitchen.name).to.be.equal('This is Hasstrups test kitchen');
    });
  });
});
