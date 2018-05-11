import request from 'supertest';
import { stub } from 'sinon';
import { expect } from 'chai';
import app from '../../../index';
import Encrypt from '../../../helpers/encrypt';
import models from '../../../models/v2/relationship';
import mailers from '../../../helpers/mailers';

const { User } = models;
let res;
let token;
let data;

describe('User resources', () => {
  describe('Get requests', () => {
    it('call to / should get all the users in the db', async () => {
      res = await request(app).get('/api/v1/users');
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.be.an('array');
    });

    describe('Authorized methods', () => {
      before(async () => {
        data = await User.findAll();
        data = data[0].get({ plain: true });
        token = await Encrypt.issueToken({ id: data.id });
      })
      it('a call to update a user resource with the right authorization', async () => {
        const res = await request(app).put(`/api/v1/users/${data.id}`).set('authorization', token).send({ username: 'hasstirere'})
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.data.username).to.be.equal('hasstirere');
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
