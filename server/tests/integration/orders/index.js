import request from 'supertest';
import { expect } from 'chai';
import Encrypt from '../../../helpers/encrypt';
import app from '../../../';

let res;
let valid;

describe('Orders endpoints', () => {
  it('should fetch all the orders belonging to client 1', async () => {
    res = await request(app).get('/api/v1/orders/').set('authorization', `${Encrypt.hashStr('HellothereKanye1')}`).query({ uuid: '1', type: 'user' });
    expect(res.body.data).to.be.an('array');
    expect(res.body.data[0].client.username).to.equal('hasstrupezekiel123');
    expect(res.statusCode).to.equal(200)
  });

  it('Get request for the orders of a kitchen', async () => {
    res = await request(app).get('/api/v1/orders').set('authorization', `${Encrypt.hashStr('HellothereKanye1')}`).query({ ktid: '1', type: 'kitchen', uuid: '1'})
    expect(res.body.data[0].content[0].items[0].name).to.equal('Fried Rice and is awesome');
    expect(res.body.data).to.be.an('array');
    expect(res.statusCode).to.equal(200)
  });

  it('Post request should create a new order', async () => {
    let valid = { content: { 1: { items: [1, 2, 3], processed: false }}}
    res = await request(app).post('/api/v1/orders/').send(valid).set('authorization', `${Encrypt.hashStr('HellothereKanye1')}`).query({ uuid: '1' });
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.client).to.equal(1);
  });

  it('Update one should', async () => {

  })
});
