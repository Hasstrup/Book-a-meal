import request from 'supertest';
import { expect } from 'chai';
import app from '../../../';
import Encrypt from '../../../helpers/encrypt';

let res;

describe('Meal endpoints', () => {
  it('A get request to /:meal_id shoud fetch the required meal', async () => {
    res = await request(app).get('/api/v1/meals/14');
    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.name).to.equal('Fried Rice and Menu');
  });

  it('Post request to create a new meal option', async () => {
    res = await request(app).post('/api/v1/meals/2').send({ name: 'A truly awesome kitchen', description: 'Hmmm great!'}).set('authorization', `${Encrypt.hashStr('HellothereKanye2')}`);
console.log(res.body)
    expect(res.statusCode).to.equal(201);
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.description).to.equal('Hmmm great!');
  });

  it('Put request should edit the successful meal', async () => {
    res = await request(app).put('/api/v1/meals/2').send({ name: 'You are truly amazing' }).set('authorization', `${Encrypt.hashStr('HellothereKanye2')}`).query({ mealId: '20' })
    console.log(res.body)
    expect(res.statusCode).to.equal(201);
    expect(res.body.data.name).to.equal('You are truly amazing');
  });
  it('Put request should edit the successful meal', async () => {
    res = await request(app).delete('/api/v1/meals/2').set('authorization', `${Encrypt.hashStr('HellothereKanye2')}`).query({ mealId: '20' })
    expect(res.statusCode).to.equal(204);
  });
});
