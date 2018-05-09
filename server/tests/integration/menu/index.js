import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import Encrypt from '../../../helpers/encrypt';
import models from '../../../models/v2/relationship';

const { Menu, User, Kitchen, Meal } = models;


let res;
let test;
let data;
let token;
let meals;

describe('Menu routes and endpoints', () => {
  before(async () => {
    res = await Menu.findAll();
    data = res[0].get({ plain: true });
    test = await User.findAll({ include: [Kitchen] });
    test = test[0];
    token = await Encrypt.issueToken({ id: test.id });
    meals = await Meal.findAll({ where: { KitchenId: test.Kitchen.id }, include: [{ all: true }] });
  });

  it('A call to catalogue should return an array of menu of the days', async () => {
    res = await request(app).get('/api/v1/menus/catalogue');
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('a call to fetch single should return the valid menu', async () => {
    res = await request(app).get(`/api/v1/menus/${data.id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.name).to.equal('This is pretty awesome menu');
  });


  it('should set the menu of the day for a user with a kitchen', async () => {
    data = { name: 'This is the menu of the day', description: 'Here it is neccessary', meals };
    res = await await request(app).post('/api/v1/menus').set('authorization', token).send(data);
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.Meals).to.be.an('array');
  });
});
