import request from 'supertest';
import { expect } from 'chai';
import app from '../../../index';
import Encrypt from '../../../helpers/encrypt';

let res;
describe('User resources', () => {
  describe('Get requests', () => {
    it('call to / should get all the users in the db', async () => {
      res = await request(app).get('/api/v1/users');
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.be.an('array');
    });

    it('should receive a single user in the database', async () => {
      res = await request(app).get('/api/v1/users/1');
      expect(res.statusCode).to.be.equal(200);
      expect(res.body.message).to.be.an('object');
    });
  });

  describe('Authorized methods', () => {
    it('a call to update a user resource with the right authorization', async () => {
      const res = await request(app).put('/api/v1/users/2').set('authorization', Encrypt.hashStr(`Hellothere2`).toString()).send({ username: 'hasstirere'})
      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data.username).to.be.equal('hasstirere');
    });
    it('a call to delete a resource with the right values returns a 204', async () => {
      res = await request(app).delete('/api/v1/users/2').set('authorization', Encrypt.hashStr(`Hellothere2`).toString());
      expect(res.statusCode).to.be.equal(204);
    });
  });
});
