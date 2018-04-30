import 'babel-polyfill';
import { expect } from 'chai'
import DataHandler from '../../../databases/handler';
import mocks from './mock'
import kitchens from '../../../databases/data/kitchens';

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
    expect(dataParser.getAll).to.be.a('function');
    expect(dataParser.create).to.be.a('function');
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

  describe('DataHandler create method', () => {
    const schema = { username: String, password: String, email: String, kitchens: Array }

    it('should throw an error with invalid input cases', async () => {
      try {
        const testuser = { username: 'hasstrup', password: 1234, email: 'hasstrup.ezekiel@gmail.com' };
        const User = new DataHandler(schema);
        return await User.create(testuser);
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equal('Wrong datatype for field password');
      }
    });

    it('should return a valid user object with valid input', async () => {
      try {
        const Parser = new DataHandler(schema);
        const data = {username: 'hasstrupezekiel', password: '1234', email: 'hasstrup.ezekiel@gmail.com', kitchens: [1, 2, 3] };
        const user = await Parser.create(data);
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
    const User = new DataHandler(schema);
    before(() => {
      mocks.forEach(async (mock) => {
        return await User.create(mock);
      });
    });

    describe('Datahandler findOne method', () => {
      it('should throw an error with invalid args', async () => {
        try {
          return await User.findOne(123);
        } catch (err) {
          expect(err).to.exist;
          expect(err.message).to.equal('Invalid query passed, must be an object');
        }
      });

      it('should throw an error when a key thats not in the schema is passed across', async () => {
        try {
          return await User.findOne({ unknown: 'User' });
        } catch (err) {
          expect(err.message).to.equal('unknown is not contained in the schema of this model');
        }
      });

      it('should throw an error with the wrong datatype for the field in the schema', async () => {
        try {
          return await User.findOne({ username: 1234 });
        } catch (err) {
          expect(err).to.exist;
          expect(err.message).to.equal('Invalid datatype passed to username');
        }
      });

      it('should return the valid user given the right params', async () => {
        try {
          const user = await User.findOne({username: 'ChisomRes'})
          expect(user.id).to.equal(2);
          expect(user).to.be.an('object');
        } catch (err) {
          expect(err).to.not.exist;
        }
      });

      describe('Users checkForRefs method', () => {
        it('should return the an array of refs', () => {
          const newschema = {hasstrup: 123, hasstruip: {refs: "User"}, data: { refs: 1243}, boom: { refs: "string"}, array: [{ refs: 'User'}]}
          User.checkForRefs(newschema)
        });
      });
    });
    describe('Datahandler get Data method and population',  () => {
      const Caterer = new DataHandler({
        name: String,
        kitchens: [{ refs: 'Kitchens'}],
        vendor: {refs: 'Vendor'}
      })

      it('should return the populated corresponding fields of hasstrup', async () => {
        try {
          const data = await  Caterer.create({
            name: 'Hasstrup Ezekiel',
            vendor: 1,
            kitchens: [1,2] });
          const result = Caterer.getData()[1];
          expect(result.kitchens).to.be.an('array');
          expect(result.vendor.name).to.equal('Fried fish');
          expect(result.kitchens[0].name).to.equal('Yet another smaple kitchen')
        } catch (err) {
          throw err
        }
      })
    });
  });
  describe('Datahandler methods from scratch', () => {
    const Kitchen = new DataHandler({
      name: String,
      reviews: Number,
      menus: [{ refs: 'Menu' }],
      caterer: { refs: 'Users' },
      subscribers: [{ refs: 'Users' }],
    });

    let data;
    let populatedData;

    before(() => {
      Object.values(kitchens).forEach(async (item) => {
        await Kitchen.create(item);
      })
    });
    it('Get all method should return the kitchens', () => {
      try {
        data = Kitchen.getAll();
        expect(data).to.be.an('array');
        expect(data[0].name).to.equal('Yet another smaple kitchen');
        expect(data[3].name).to.equal('akpobor kitchen');
      } catch (e) {
        expect(e).to.not.exist
      }
    });

    it('Get all with populate args, should return populated fields', () => {
      try {
        data = Kitchen.getAll('populate');
        expect(data).to.be.an('array');
        expect(data[0].caterer).to.be.an('object');
        expect(data[0].subscribers[0]).to.be.an('object');
        expect(data[0].subscribers[0].username).to.equal('mayemusk')
      } catch (e) {
        expect(e).to.not.exist
      }
    });

    it('findOne method should return the given data populated', () => {
      try {
        data = Kitchen.findOne({ id: 3 }, 'populate');
        expect(data).to.be.an('object');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });

    it('findOneAndUpdate method should return the changed object', async () => {
      try {
        await Kitchen.findOneAndUpdate({id: 3}, { name: 'hasstrup Kitchen'});
        data = Kitchen.findOne({id: 3});
        expect(data.name).to.be.equal('hasstrup Kitchen');
      } catch (e) {
        expect(e).to.not.exist
      }
    });

    it('should delete the specified kitchen from state', () => {
      try {
        Kitchen.findOneAndDelete({id: 3});
        data = Kitchen.findOne({ id: 3 });
        expect(data).to.be.null
      } catch (e) {
        expect(e).to.not.exist
      }
    })
  })
});
