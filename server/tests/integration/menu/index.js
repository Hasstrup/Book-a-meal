import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import Encrypt from '../../../helpers/encrypt';


let res;

describe('Menu routes and endpoints', () => {

  it('A call to catalogue should return an array of menu of the days', async () => {
    res = await request(app).get('/api/v1/menus/catalogue');
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it(' a call to fetch single should return the valid menu', async () => {
    res = await request(app).get('/api/v1/menus/1');
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.name).to.equal('Fried rice and fish');
  });

  it('a call to set menu of the day should return the new menu', async () => {
    res = await request(app).post('/api/v1/menus').query({ uuid: '1' }).set('authorization', `${Encrypt.hashStr(`HellothereKanye2`)}`).send({ name: 'This is a nice kitchen', description: 'This is nice ASWELL'});
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.name).to.equal('Yet another smaple kitchen2');
  });

})
