import { expect } from 'chai';
import models from '../../../models/v2/relationship';
import { validmenu } from '../factories/'

const { Menu, Kitchen, User } = models;
let data;
let source;
let res;

/* eslint no-return-await: 0, no-unused-expressions: 0 */
describe(' Menu model postgres', () => {
  describe('Create functions', () => {
    before(async () => await Menu.sync({ force: true }));

    it('should create a valid menu in the database', async () => {
      try {
        source = await Kitchen.findAll();
        data = { ...validmenu, KitchenId: source[0].id };
        res = await Menu.create(data);
        expect(res).to.exist;
        expect(res.name).to.equal('This is pretty awesome menu');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });

    it('Should throw an error with null or missing KitchenId key', async () => {
      try {
        return await Menu.create(validmenu);
      } catch (e) {
        expect(e).to.exist;
      }
    });
  });

  describe('Menu finder methods', () => {
    it('Find all should return an array of menus', async () => {
      data = await Menu.findAll();
      expect(data).to.be.an('array');
    });

    it('Find one should return an object of data', async () => {
      data = await Menu.findOne({ where: { name: 'This is pretty awesome menu' } });
      expect(data).to.be.an('object');
      expect(data.KitchenId).to.be.a('string');
    });

    describe('Menu relationships and population', async () => {
      // create a kitchen and include it in the query
      before(async () => {
        [res] = await Kitchen.findAll();
        await Menu.create({ name: 'This is Hasstrups sexy kitchen', description: 'This is a pretty great ting', KitchenId: res.id });
        return await Menu.create({ name: 'This is another sexy Hasstrup Kitchen', description: 'This another pretty great ting', KitchenId: res.id });
      });

      it('Find one should populate the menu with content', async () => {
        data = await Menu.findOne({ where: { name: 'This is Hasstrups sexy kitchen' }, include: [Kitchen] });
        expect(data.Kitchen).to.be.an('object');
      });

      it('Kitchen should have an array of menus', async () => {
        data = await Kitchen.findOne({ where: { id: res.id }, include: [Menu] });
        expect(data.Menus).to.be.an('array');
        expect(data.Menus.length).to.equal(3);
      });
    });


  });
});
