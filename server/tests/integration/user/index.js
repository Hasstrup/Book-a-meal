import request from 'supertest';
import { stub } from 'sinon';
import { expect } from 'chai';
import app from '../../../index';
import Encrypt from '../../../helpers/encrypt';
import mailers from '../../../helpers/mailers';

let res;
let token;
const stub1 = stub(mailers, 'dispatch');
stub1.returns({ nothing: 'boom' });
describe('User resources', () => {
  describe('Get requests', () => {
    it('call to / should get all the users in the db', async () => {
      res = await request(app).get('/api/v1/users');
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.be.an('array');
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

      it('a call to send reset password token', async () => {
        res = await request(app).post('/api/v1/users/send/reset/password').send({ email: 'hasstrup.ezekiel@gmail.com' });
        token = res.body.data.content;
        expect(res.statusCode).to.equal(200);
      });

      it('checking the reset password logic', async () => {
        res = await request(app).get('/api/v1/users/reset/password').query({ tk: token });
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.resetPasswordCount).to.equal(1);
      });
    });
});
});
