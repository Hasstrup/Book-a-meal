import { expect } from 'chai';
import MenuServiceObject from '../../../services/menu';
import models from '../../../models/v2/relationship';

const { Kitchen, User } = models;

let data;
let target;
let testKitchen;

describe('Menu Service Object', () => {
  it('Get All should return all the menus in the mock store', async () => {
    data = await MenuServiceObject.fetchAll();
    expect(data[0]).to.be.an('object');
    expect(data[0].name).to.be.equal('Fried rice and fish');
  });
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', () => {
    data = MenuServiceObject.fetchOne('id', 4);
    expect(data.owner).to.equal(4);
    expect(data.mealOptions).to.include(4);
  });

  it('updateone should update the details of a kitchen', async () => {
    data = await MenuServiceObject.updateOne('owner', 7, { name: 'Otse CookSpot' });
    expect(data.name).to.equal('Otse CookSpot');
  });

  it('deleteOne should delete specfied object', () => {
    MenuServiceObject.deleteOne('owner', 9);
    expect(MenuServiceObject.fetchOne('owner', 9)).to.be.null;
  });

  it('getCatalogue should return an array of menus of the day', () => {
    data = MenuServiceObject.fetchCatalogue();
    expect(data).to.be.an('array');
    expect(data[0]).to.be.an('object');
  });

  it('create a menu should return the menu with the valid input', async () => {
    data = { name: 'This is Hasstrups kitchen', description: 'This is actually an awesome meal' };
    target = await MenuServiceObject.create(5, data);
    expect(target).to.be.an('object');
    expect(target.name).to.equal('This is Hasstrups kitchen');
    expect(target.owner).to.equal(5);
  });
  /* eslint prefer-destructuring: 0, no-underscore-dangle: 0 */
  describe('DB Method calls', () => {
    before(async () => {
      data = await User.findAll();
      target = data[0];
      // create a new test kitchen;
      testKitchen = await Kitchen.create({ name: 'Bay and Ruts', description: 'A really expensive restaurant on the island', userId: target.id });
    });

    it('__create method should persist data new menus to my db', async () => {
      data = { name: 'This is a pretty nice meal you know', description: 'Aloha this is pretty great', kitchenId: testKitchen.id };
      target = await MenuServiceObject.__create(data);
      expect(target.name).to.equal('This is a pretty nice meal you know');
    });

    it('__fetchAll should return an array of menus from my db along with its', async () => {
      data = await MenuServiceObject.__fetchAll()();
      expect(data).to.be.an('array');
      expect(data[0].meals).to.be.an('array');
    });

    it(' __fetchone should retrive the populated data from the db', async () => {
      data = await MenuServiceObject.__fetchOne('name', 'This is a pretty nice meal you know')();
      expect(data).to.be.an('object');
      expect(data.id).to.exist;
    });

    it('__updateOne should update the table', async () => {
      data = await MenuServiceObject.__updateOne('name', 'This is a pretty nice meal you know', { name: 'Hasstrups awesome menu' });
      expect(data.name).to.equal('Hasstrups awesome menu');
    });

    it('__deleteOne should delete the specified items in the table', async () => {
      try {
        data = await MenuServiceObject.__deleteOne('name', 'Hasstrups awesome menu');
        await MenuServiceObject.__fetchOne('name', 'Hasstrups awesome menu');
      } catch (err) {
        expect(err.status).to.equal(422);
      }
    });
  });
});
