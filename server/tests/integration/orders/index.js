import request from 'supertest';
import { expect } from 'chai';
import Encrypt from '../../../helpers/encrypt';
import app from '../../../';
import models from '../../../models/v2/relationship';
import OrderService from '../../../services/orders/';
import MenuService from '../../../services/menu';

let res;
let valid;
let target;
let data;
let meals;
let token;
let kitchenToken;
let test;

/* eslint prefer-destructuring: 0, no-underscore-dangle: 0 */
const { User, Meal, Kitchen } = models;

describe('Orders endpoints', () => {
  before(async () => {
    data = await User.findAll({ include: [Kitchen] });
    data = data[1];
    const kitchen = await Kitchen.findAll({ limit: 2 });
    target = await Meal.findAll({ where: { kitchenId: kitchen[0].id }, include: [{ all: true }] });
    meals = target.map(meal => ({ id: meal.id, quantity: 4, kitchenId: meal.kitchenId }));
    // need to add to menu of the day;
    await MenuService.__setMenuOfTheDay(kitchen[0], { name: 'This is a test', description: 'yeah this is a test', meals });
    token = await Encrypt.issueToken({ id: data.id });
    kitchenToken = await Encrypt.issueToken({ id: kitchen[0].userId });
    test = await OrderService.__create(data.id, { meals });
  });

  it('should fetch all the orders belonging to client 1', async () => {
    res = await request(app).get('/api/v1/orders/').set('authorization', token).query({ type: 'user' });
    expect(res.body.data).to.be.an('array');
    expect(res.body.data[0].userId).to.equal(data.id);
    expect(res.statusCode).to.equal(200);
  });

  it('Get request for the orders of a kitchen', async () => {
    res = await request(app).get('/api/v1/orders').set('authorization', kitchenToken).query({ type: 'kitchen' });
    expect(res.body.data).to.be.an('array');
    expect(res.statusCode).to.equal(200);
  });

  it('Post request should create a new order', async () => {
    valid = { meals };
    res = await request(app).post('/api/v1/orders/').send(valid).set('authorization', token);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.userId).to.equal(data.id);
    test = res.body.data;
  });

  it('Put request should change the quantity of the created item', async () => {
    valid = { quantity: 10 };
    res = await request(app).put(`/api/v1/orders/${test.id}`).set('authorization', token).send(valid)
      .query({ type: 'user', mealId: test.meals[0].id });
    expect(res.body.data.quantity).to.equal(10);
  });

  it('Put request should fail the without the right token', async () => {
    res = await request(app).put(`/api/v1/orders/${data.id}`).set('authorization', token).send(valid)
      .query({ type: 'kitchen' });
    expect(res.statusCode).to.equal(403);
  });
});
