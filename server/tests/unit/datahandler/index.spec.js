import 'babel-polyfill';
import { expect } from 'chai'
import DataHandler from '../../../databases/handler';

/* eslint no-unused-expressions: 0 */

describe('DatahHandler Class constructor', () => {
  const dataParser = new DataHandler({});
  it('should have attrubutes data,keys, init data', () => {
    expect(dataParser.data).to.exist;
    expect(dataParser.keys).to.exist;
    expect(dataParser.keys).to.be.an('object');
  });

  it('should have methods findbyKey findOne returnAll pushData removeData findByKeyAndDelete findByKeyAndUpdate', () => {
    expect(dataParser.findByKey).to.be.a('function');
    expect(dataParser.findOne).to.be.a('function');
    expect(dataParser.all).to.be.a('function');
    expect(dataParser.pushData).to.be.a('function');
    expect(dataParser.findByKeyAndDelete).to.be.a('function');
    expect(dataParser.findByKeyAndUpdate).to.be.a('function');
    expect(dataParser.validateInput).to.be.a('function');
  });

  describe('dtahandler registering keys methods', () => {

    it('should reject input if args is not an object', () => {
      try {
        const invalid = [1, 'hello', []];
        const Parser = new DataHandler(invalid[Math.floor(Math.random() * invalid.length)]);
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
        const Parser = new DataHandler(invalidUser);
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });

  describe('DataHandler pushDataMethod methods', () => {
    const schema = { username: String, password: String, email: String, kitchens: Array }

    it('should not return a valid instance with invlaid input cases', async () => {
      try {
        const testuser = { username: 'hasstrup', password: 1234, email: 'hasstrup.ezekiel@gmail.com' };
        const User = new DataHandler(schema);
        return await User.pushData(testuser);
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equal('Wrong datatype for field password');
      }
    });

    it('should return a valid user object', async () => {
      try {
        const Parser = new DataHandler(schema);
        const data = { username: 'hasstrupezekiel', password: '1234', email: 'hasstrup.ezekiel@gmail.com', kitchens: [1, 2, 3] };
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
});
