import { expect } from 'chai';
import models from '../../../models/v2/relationship';

let data;
let target;
let source;
let test;
let status = {};

const { Order, User, Meal, Kitchen } = models;

/* eslint no-unused-expresions: 0, prefer-destructuring: 0, prefer-const: 0, object-curly-newline: 0, max-len: 0 */
describe(' Order model POSTGRES', () => {
  before(async () => {
    await Order.sync({ force: true });
    const kitchens = await Kitchen.findAll();
    test = kitchens[0];
  });

  describe('Create Method', () => {
    before('Should return an order with valid user input', async () => {
      source = await User.findAll();
      status[`${test.id}`] = false;
      data = { status, userId: source[0].id };
    });

    it('Should return a order with valid user input', async () => {
      target = await Order.create(data);
      expect(target.status).to.be.an('object');
    });
  });
  describe('Testing Relationship', () => {
    it('It should return the owner of the order', async () => {
      data = await target.getUser();
      expect(data).to.be.an('object');
      expect(data).to.have.property('username');
    });

    it('Should return the meals belonging to an order', async () => {
      source = await Meal.findAll();
      await target.addMeal(source[0].id);
      data = await target.getMeals();
      expect(data).to.be.an('array');
    });
  });
});
