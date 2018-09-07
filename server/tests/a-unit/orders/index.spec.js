import { expect } from 'chai';
import { stub } from 'sinon';
import moment from 'moment';
import OrderService from '../../../services/orders/';
import MenuService from '../../../services/menu';
import models from '../../../models/v2/relationship';

let data;
let user
let target;
let source;
let targetkitchen;
let stub1

/* eslint no-unused-expressions: 0, no-underscore-dangle: 0, prefer-destructuring: 0, prefer-const: 0, max-len: 0, arrow-body-style: 0, object-curly-newline: 0 */
const { User, Meal, Order, Kitchen } = models;

describe('Order service object', () => {
  it(' The fetch all method should return the details for the kitchen', async () => {
    data = await OrderService.fetchAll('user', 2);
    expect(data).to.be.an('array');
    expect(data[0].content['1'].items[0].name).to.equal('Fried Rice and Menu & what not');
  });

  it('should update one should only update the processed part of the order owned by the kitchen', async () => {
    data = await OrderService.updateOne('id', 1, 2);
    expect(data.content['2'].processed).to.be.true;
  });

  it('create method should return the valid data fail case', async () => {
    try {
      target = { client: 2, content: { items: [2, 4, 5], processed: true } };
      await OrderService.create(target);
    } catch (e) {
      expect(e).to.exist;
    }
  });

  it('create method should return the valid object', async () => {
    target = { client: 1, content: { 1: { items: [0, 1, 2], processed: false } } };
    data = await OrderService.create(1, target);
    expect(data.content).to.be.an('object');
    expect(data.id).to.equal(3);
  });

  describe(' DB Persistent methods', () => {
    before(async () => {
      [targetkitchen] = await Kitchen.findAll({ });
      await Meal.create({ name: 'This is a meal', description: 'A description', kitchenId: targetkitchen.id, price: 5000 });
      data = await User.findAll();
      target = data[0];
      source = await Meal.findAll({ where: { kitchenId: targetkitchen.id },include: [Kitchen], attributes: ['id', 'kitchenId']});
      await MenuService.__setMenuOfTheDay(targetkitchen, { name: 'This is the menu of the day', description: 'Nothing', meals: source });
    });

    it('__create method should create a new object in the database', async () => {
      try {
        let status = {};
        source = source.map((item) => {
          return { id: item.id, quantity: Math.floor(Math.random() * 10), kitchenId: item.kitchenId };
        });
        data = await OrderService.__create(target.id, { meals: source, status });
        expect(data).to.be.an('object');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });

    it('__updateOne should change the status of a kitchen to processed or not', async () => {
      data = await OrderService.__updateOne('id', data.id, targetkitchen.id, 'kitchen');
      expect(data.status[`${source[0].kitchenId}`]).to.equal(true);
    });

    it('__updateOne should change the quantity of an item in an order in the db', async () => {
      data = await OrderService.__updateOne('id', data.id, source[0].id, 'user', { quantity: 7 });
      expect(data.quantity).to.equal(7);
    });
  });
});
