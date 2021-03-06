import { expect } from 'chai';
import models from '../../../models/v2/relationship';
import { validmenu } from '../factories';

const { Meal, Kitchen, Menu } = models;
let source;
let target;
let data;

/* eslint object-curly-newline: 0, no-unused-expressions: 0 */
describe('Meal model Postgres', () => {
  before(async () => {
    await Meal.sync({ force: true });
  });

  describe('Create function', () => {
    it('Should inject a valid meal into the database', async () => {
      source = await Kitchen.findAll();
      target = await Meal.create({ name: 'Fried Rice and Banku', description: 'This is the FriedRice andd Banku ting', kitchenId: source[0].id, price: 2000 });
      expect(target).to.be.an('object');
      expect(target.name).to.equal('Fried Rice and Banku');
    });
  });

  it('Should reject invalid meal', async () => {
    try {
      return await Meal.create({});
    } catch (e) {
      expect(e).to.exist;
    }
  });

  describe('Meal find methods', () => {
    it('Find all should return an array of meals', async () => {
      data = await Meal.findAll();
      expect(data).to.be.an('array');
    });

    it('Find One should return an object of meal', async () => {
      data = await Meal.findOne({ where: { id: target.id } });
      expect(data).to.be.an('object');
      expect(data.name).to.equal('Fried Rice and Banku');
    });
  });

  describe('Relationships of the meal', () => {
    it('Get Kitchen(owner) of the meal Bi-directional', async () => {
      data = await Meal.findOne({ where: { id: target.id }, include: [Kitchen] });
      expect(data.kitchen).to.be.an('object');
    });

    it('The Kitchen should have meals Bi-directional', async () => {
      data = await Kitchen.findOne({ where: { id: source[0].id }, include: [Menu, Meal] });
      expect(data.menus).to.be.an('array');
      expect(data.meals).to.be.an('array');
      expect(data.meals.length).to.be.above(0);
    });
  });

  describe(' Menu to meal relationship', () => {
    before(async () => {
      const kitchen = await Kitchen.findAll({ limit: 1 });
      await Menu.create({ ...validmenu, kitchenId: kitchen[0].id });
      source = await Menu.findAll();
      data = await Meal.findOne({ where: { id: target.id } });
      await data.update({ menuId: source[0].id });
    });
    it('Menu relationship with meals', async () => {
      const [a] = source;
      expect(await data.getMenu()).to.be.an('object');
      expect(await a.getMeals()).to.be.an('array');
    });
  });
});
