import request from 'supertest';
import { expect } from 'chai';
import app from '../../../index';

let invalidData;
let validData;
let res;

/* eslint no-unused-expressions: 0 */
describe('API - Authentication routes', () => {
  describe('Sign auth api', () => {
    it('should respond  with 404', async () => {
      invalidData = { username: 'String', password: 'Onosetale32', email: 1234 };
      res = await request(app).post('/api/v1/auth/signup').send(invalidData);
      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.exist;
    });

    it('should respond with the current user and 201 with validData', async () => {
      validData = { username: 'testUsername', password: 'Onosetale32', email: 'hasstrup.eze@gmail.com', firstname: 'HasstrupEzekiel' }
      res = await request(app).post('/api/v1/auth/signup').send(validData);
      expect(res.statusCode).to.equal(201);
      expect(res.body.data.username).to.equal('testUsername');
    });
  });

  describe('Log in method - int', () => {
    it('should reject an invalid request with status 422', async () => {
      invalidData = { username: 'Teststs', password: 'onosetale' };
      res = await request(app).post('/api/v1/auth/login').send(invalidData);
      expect(res.statusCode).to.equal(422);
      expect(res.body.error).to.exist;
    });

    it('should log in the user with a response code of 200 and message', async () => {
      validData = { username: 'testUsername', password: 'Onosetale32' };
      res = await request(app).post('/api/v1/auth/login').send(validData);
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.exist;
    });
  });
});
