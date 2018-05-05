import { expect } from 'chai';
import  models from '../../../models/relationship';
import { validKitchen, invalidKitchen } from '../factories/';

const { Kitchen } = models;
let data;
/* eslint no-unused-expressions: 0 */
describe('Kitchen model POSTGRES', () => {
  before(() => {
    Kitchen.sync();
  });

  // after(() => {
  //   // clear the db
  //   Kitchen.sync({ force: true });
  // });

  it('Create method should create a new user with a valid object', async () => {
    try {
      data = await Kitchen.create(validKitchen);
      expect(data).to.be.an('object');
      expect(data.id).to.exist;
      expect(data.name).to.equal('Hasstrups Test Kitchen');
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Create method should throw an error with invalid data', async () => {
    try {
      data = await Kitchen.create(invalidKitchen);
    } catch (e) {
      expect(e).to.exist;
    }
  });

  it('Find One method should retrieve an object from the db', async () => {
    try {
      data = await Kitchen.findOne({ where: { name: 'Hasstrups Test Kitchen' }});
      expect(data).to.exist;
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('Find All shoud return an array of kitchens', async () => {
    try {
      data = await Kitchen.findAll();
      expect(data).to.be.an('array');
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  describe('Kitchen relationships and population', () => {
    before(() => {
      // create the a kitchen belonging to a user;
    });
  });
});
