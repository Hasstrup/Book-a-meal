import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import Encrypt from '../../../helpers/encrypt'

let res;
let data;

describe('Kitchen endpoints', () => {
  it(' Get /kitchens/ should give all the kitchens in the db if logged in', async () => {
    res = await request(app).get('/api/v1/kitchens/');
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('should get the specific user Get/:ktid', async () => {
    res = await request(app).get('/api/v1/kitchens/3').query({ uuid: '2', populate: 'populate' });
    expect(res.statusCode).to.equal(200);
    expect(res.body.data.name).to.equal('Hasstrups Kitchen');
    expect(res.body.data.caterer).to.be.an('object');
  });

  it('should accept a valid kitchen obect', async () => {
    data = { name: 'Hello Hasstrup Ezekiel kitchen', description: 'This is a lovely description' }
    res = await request(app).post('/api/v1/kitchens/').send(data).set('authorization', 'thisshouldwordkjustfine').query({ uuid: '2' });
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.name).to.equal('Hello Hasstrup Ezekiel kitchen');
  });

  it('call to the kitchen put endpoint should', async () => {
    data = { subscribers: [3, 2] };
    res = await request(app).put('/api/v1/kitchens/2').send(data).set('authorization', `${Encrypt.hashStr('HellothereKanye2')}`);
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.subscribers).to.include(3);
  });

  it('/api/ should get the delete a kitchen', async () => {
    res = await request(app).delete('/api/v1/kitchens/9').set('authorization', `${Encrypt.hashStr('HellothereKanye9')}`);
    expect(res.statusCode).to.equal(204);
  });

  it('should return the subscribers of a platform', async () => {
    res = await request(app).get('/api/v1/kitchens/fetch/subscribers').query({ uuid: '7', ktid: '7'}).set('authorization', `${Encrypt.hashStr('HellothereKanye7')}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });
});
