import 'babel-polyfill';
import { expect } from 'chai'
import DataHandler from '../../../databases/handler';
import mocks from './mock'

/* eslint no-unused-expressions: 0 */

describe('DatahHandler Class constructor', () => {
  const dataParser = new DataHandler({});
  it('should have attrubutes data,keys, init data', () => {
    expect(dataParser.data).to.exist;
    expect(dataParser.keys).to.exist;
    expect(dataParser.keys).to.be.an('object');
  });

  it('should have methods findbyKey findOne returnAll pushData removeData findByKeyAndDelete findByKeyAndUpdate', () => {
    expect(dataParser.findOne).to.be.a('function');
    expect(dataParser.all).to.be.a('function');
    expect(dataParser.pushData).to.be.a('function');
    expect(dataParser.findOneAndDelete).to.be.a('function');
    expect(dataParser.findOneAndUpdate).to.be.a('function');
    expect(dataParser.validateInput).to.be.a('function');
  });

  describe('dtahandler registering keys methods', () => {

    it('should reject input if args is not an object', () => {
      try {
        const invalid = [1, 'hello', []];
        return new DataHandler(invalid[Math.floor(Math.random() * invalid.length)]);
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equal('invalid input passed into datahandler');
      }
    });

    it('should throw an error if an invalid ADT is passed as a value', () => {
      try {
        const invalidUser = {
          username: String,
          password: 'thisisatestpassword',
          large: String
        };
        return new DataHandler(invalidUser);
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });

  describe('DataHandler pushdata method', () => {
    const schema = { username: String, password: String, email: String, kitchens: Array }

    it('should throw an error with invalid input cases', async () => {
      try {
        const testuser = { username: 'hasstrup', password: 1234, email: 'hasstrup.ezekiel@gmail.com' };
        const User = new DataHandler(schema);
        return await User.pushData(testuser);
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equal('Wrong datatype for field password');
      }
    });

    it('should return a valid user object with valid input', async () => {
      try {
        const Parser = new DataHandler(schema);
        const data = {username: 'hasstrupezekiel', password: '1234', email: 'hasstrup.ezekiel@gmail.com', kitchens: [1, 2, 3] };
        let user = await Parser.pushData(data);
        expect(user).to.have.property('username');
        expect(user.username).to.equal('hasstrupezekiel');
        expect(user.kitchens).to.be.an('array');
        expect(user.id).to.exist;
      } catch (err) {
        expect(err).to.not.exist;
      }
    });
  });

  describe('DataHandler findData methods', () => {
    const schema = { username: String, password: String, email: String, subscribers: Array };
    const User = new DataHandler(schema)
    before(() => {
      mocks.forEach(async (mock) => {
        return await User.pushData(mock)
      });
    });

    describe('Datahandler findOne method', () => {
      it('should throw an error with invalid args', async () => {
        try {
          return await User.findOne(123);
        } catch(err) {
          expect(err).to.exist;
          expect(err.message).to.equal('Invalid query passed, must be an object')
        }
      });

      it('should throw an error when a key thats not in the schema is passed across', async () => {
        try {
          return await User.findOne({unknown: 'User'})
        } catch(err) {
           expect(err.message).to.equal('unknown is not contained in the schema of this model');
        }
      });

      it('should throw an error with the wrong datatype for the field in the schema', async () => {
        try {
          return await User.findOne({username: 1234});
        } catch (err) {
          expect(err).to.exist;
          expect(err.message).to.equal('Invalid datatype passed to username')
        }
      });

      it('should return the valid user given the right params', async () => {
        try {
          const user = await User.findOne({username: 'ChisomRes'})
          expect(user.id).to.equal(1);
          expect(user).to.be.an('object');
        } catch (err) {
          expect(err).to.not.exist;
        }
      });
    });
  })
});
