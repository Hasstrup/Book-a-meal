import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import Encrypt from '../../../helpers/encrypt';
import models from '../../../models/v2/relationship';

let res;
let token;
let test;
let data;
let meals;
const { Menu, Meal, User, Kitchen } = models

describe('Meal endpoints', () => {

  before(async () => {
    test = await User.findAll({ include: [Kitchen] });
    test = test[0];
    token = await Encrypt.issueToken({ id: test.id });
    meals = await Meal.findAll();
    data = meals[0].get({ plain: true })
  });

  it('Post request to create a new meal option', async () => {
    res = await request(app).post('/api/v1/meals/').send({ name: 'A truly awesome kitchen', description: 'Hmmm great!', price: 4000 }).set('authorization', token);
    data = res.body.data;
    expect(res.statusCode).to.equal(201);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.description).to.equal('Hmmm great!');
  });

  it('Get meals should return all the meals belonging to a kitchen', async () => {
    res = await request(app).get('/api/v1/meals').set('authorization', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('A get request to /:meal_id shoud fetch the required meal', async () => {
    res = await request(app).get(`/api/v1/meals/${data.id}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.name).to.equal('A truly awesome kitchen');
  });

  it('Put request should edit the successful meal', async () => {
    res = await request(app).put(`/api/v1/meals/${data.id}`).send({ name: 'You are truly amazing' }).set('authorization', token);
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.name).to.equal('You are truly amazing');
  });

  it('Delete request should delete a meal successfully with the right token', async () => {
    res = await request(app).delete(`/api/v1/meals/${data.id}`).set('authorization', token)
    expect(res.statusCode).to.equal(204);
  });

});
