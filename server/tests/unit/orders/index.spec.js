import { expect } from 'chai';
import { stub } from 'sinon';
import moment from 'moment';
import OrderService from '../../../services/orders/';
import models from '../../../models/v2/relationship';

let data;
let target;
let source;
let testkitchen;

/* eslint no-unused-expressions: 0, no-underscore-dangle: 0, prefer-destructuring: 0, prefer-const: 0, max-len: 0, arrow-body-style: 0, object-curly-newline: 0 */
const { Kitchen, User, Meal, Order } = models;

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
      data = await User.findAll();
      target = data[0];
      testkitchen = await Kitchen.create({ name: 'Bay and Ruts', description: 'A really expensive restaurant on the island', UserId: target.id });
      source = await Meal.findAll();
    });

    it('__create method should create a new object in the database', async () => {
      try {
        let status = {};
        // status[`${testkitchen.id}`] = false;
        source = source.map((item) => {
          return { id: item.id, quantity: Math.floor(Math.random() * 10), kitchen: item.KitchenId }
        });
        data = await OrderService.__create(target.id, { meals: source, status });
        expect(data).to.be.an('object');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });

    it('__updateOne should change the status of a kitchen to processed or not', async () => {
      data = await OrderService.__updateOne('id', data.id, testkitchen.id, 'kitchen');
      expect(data.status[`${testkitchen.id}`]).to.equal(true);
    });

    it('__updateOne should change the quantity of an item in an order in the db', async () => {
      data = await OrderService.__updateOne('id', data.id, source[0].id, 'user', { quantity: 7 });
      expect(data.quantity).to.equal(7);
    });

    it('__updateOne shoud fail if 10 minutes have elapsed', async () => {
      try {
        let stub1 = stub(Order, 'findOne');
        let date = moment().subtract(12, 'm');
        stub1.returns({ createdAt: date });
        data = await OrderService.__updateOne('id', data.id, source[0].id, 'user', { quantity: 7 });
      } catch (e) {
        expect(e).to.exist;
        expect(e.message).to.equal('This request is invalid, time for this might have elapsed or bad input');
      }
    });

  });
});
