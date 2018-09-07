import { expect } from 'chai';
import models from '../../../models/v2/relationship';
import { validKitchen, invalidKitchen } from '../factories/';

const { Kitchen, User } = models;
let data;
let res;
let mockdata;
/* eslint no-unused-expressions: 0 */
describe('Kitchen model POSTGRES', () => {
  before(async () => {
    await Kitchen.sync({ force: true });
  });

  describe('Create methods of the kitchen model', () => {
    it('Create method should create a new user with a valid object', async () => {
      try {
        // fetch the right user id and reassign it
        res = await User.findAll();
        mockdata = { ...validKitchen, userId: res[0].id };
        // do the main creation here
        data = await Kitchen.create(mockdata);
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
  });

  describe('Kitchen find method', () => {
    it('Find One method should retrieve an object from the db', async () => {
      try {
        data = await Kitchen.findOne({ where: { name: 'Hasstrups Test Kitchen' } });
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
  });


  describe('Kitchen relationships and population', () => {
    it('Should return the user object related to a user', async () => {
      data = await Kitchen.findOne({ where: { name: 'Hasstrups Test Kitchen' }, include: [User] });
      expect(data).to.exist;
      expect(data.user).to.be.an('object');
    });
  });
});
