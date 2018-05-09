import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken'
import Encrypt from '../../../helpers/encrypt';
import app from '../../../';
import models from '../../../models/v2/relationship';
import OrderService from '../../../services/orders/'

let res;
let valid;
let target;
let data;
let meals;
let test;
let token;

const { User, Meal, Kitchen } = models;

describe('Orders endpoints', () => {
  before(async () => {
    data = await User.findAll();
    data = data[0];
    target = await Meal.findAll();
    meals = target.map((meal) => {
      return { id: meal.id, quantity: Math.floor(Math.random() * 10), kitchen: meal.KitchenId };
    });
    token = await Encrypt.issueToken({ id: data.id });
    test = await OrderService.__create(data.id, { meals });
  });

  it('should fetch all the orders belonging to client 1', async () => {
    res = await request(app).get('/api/v1/orders/').set('authorization', token).query({ type: 'user' });
    expect(res.body.data).to.be.an('array');
    expect(res.body.data[0].UserId).to.equal(data.id);
    expect(res.statusCode).to.equal(200);
  });

  it('Get request for the orders of a kitchen', async () => {
    res = await request(app).get('/api/v1/orders').set('authorization', token).query({ type: 'kitchen' });
    expect(res.body.data).to.be.an('array');
    expect(res.statusCode).to.equal(200);
  });

  it('Post request should create a new order', async () => {
    valid = { meals };
    res = await request(app).post('/api/v1/orders/').send(valid).set('authorization', token)
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.UserId).to.equal(data.id);
  });

  it('Put request should change the quantity of the created item', async () => {
    valid = { quantity: 10 };
     data  = res.body.data;
    res = await request(app).put(`/api/v1/orders/${data.id}`).set('authorization', token).send(valid).query({ type: 'user', mealId: data.meals[0].id });
    expect(res.body.data.quantity).to.equal(10);
  });

  it('Put request should return the change the status of the kitchen to true', async () => {
    res = await request(app).put(`/api/v1/orders/${data.id}`).set('authorization', token).send(valid).query({ type: 'kitchen' });
    expect(res.body.data.changedCorrectly).to.equal(true);
  })
});
