import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import Encrypt from '../../../helpers/encrypt'
import models from '../../../models/v2/relationship';

const { Kitchen, User } = models;

let res;
let data;
let test;
let source;
let token;

describe('Kitchen endpoints', () => {

  before(async () => {
    source = await Kitchen.findAll();
    test = source[0].get({ plain: true });
    data = await User.findAll();
    const user = data[0].get({ plain: true });
    token = await Encrypt.issueToken({ id: user.id, confirmedEmail: true });
  });

  it(' Get /kitchens/ should give all the kitchens in the db if logged in', async () => {
    res = await request(app).get('/api/v1/kitchens/');
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('should get the specific kitchen', async () => {
    res = await request(app).get(`/api/v1/kitchens/${test.id}`).query({ uuid: test.id, populate: 'populate' });
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.name).to.equal('This is Hasstrups test kitchen');
    expect(res.body.data.user).to.be.an('object');
  });

  it('should accept a valid kitchen obect', async () => {
    data = { name: 'Hello Hasstrup Ezekiel kitchen', description: 'This is a lovely description' };
    res = await request(app).post('/api/v1/kitchens/').send(data).set('authorization', token);
    expect(res.statusCode).to.equal(201);
    test = res.body.data;
    expect(res.body.data.name).to.equal('Hello Hasstrup Ezekiel kitchen');
  });

  it('call to the kitchen put endpoint should', async () => {
    data = { name: 'Hasstrup Ezekiel kitchen' };
    res = await request(app).put(`/api/v1/kitchens/${test.id}`).send(data).set('authorization', token);
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.name).to.equal('Hasstrup Ezekiel kitchen');
  });

  it('/api/ should get the delete a kitchen', async () => {
    res = await request(app).delete(`/api/v1/kitchens/${test.id}`).set('authorization', token);
    expect(res.statusCode).to.equal(204);
  });
});
