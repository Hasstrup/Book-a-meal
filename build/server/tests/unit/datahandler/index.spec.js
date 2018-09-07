'use strict';

require('babel-polyfill');

var _chai = require('chai');

var _handler = require('../../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

var _mock = require('./mock');

var _mock2 = _interopRequireDefault(_mock);

var _kitchens = require('../../../databases/data/kitchens');

var _kitchens2 = _interopRequireDefault(_kitchens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint no-unused-expressions: 0 */

describe('DatahHandler Class constructor', function () {
  var dataParser = new _handler2.default({});
  it('should have attrubutes data,keys, init data', function () {
    (0, _chai.expect)(dataParser.data).to.exist;
    (0, _chai.expect)(dataParser.keys).to.exist;
    (0, _chai.expect)(dataParser.keys).to.be.an('object');
  });

  it('should have methods findbyKey findOne returnAll pushData removeData findByKeyAndDelete findByKeyAndUpdate', function () {
    (0, _chai.expect)(dataParser.findOne).to.be.a('function');
    (0, _chai.expect)(dataParser.getAll).to.be.a('function');
    (0, _chai.expect)(dataParser.create).to.be.a('function');
    (0, _chai.expect)(dataParser.findOneAndDelete).to.be.a('function');
    (0, _chai.expect)(dataParser.findOneAndUpdate).to.be.a('function');
    (0, _chai.expect)(dataParser.validateInput).to.be.a('function');
  });

  describe('dtahandler registering keys methods', function () {
    it('should reject input if args is not an object', function () {
      try {
        var invalid = [1, 'hello', []];
        return new _handler2.default(invalid[Math.floor(Math.random() * invalid.length)]);
      } catch (err) {
        (0, _chai.expect)(err).to.exist;
        (0, _chai.expect)(err.message).to.equal('invalid input passed into datahandler');
      }
    });

    it('should throw an error if an invalid ADT is passed as a value', function () {
      try {
        var invalidUser = {
          username: String,
          password: 'thisisatestpassword',
          large: String
        };
        return new _handler2.default(invalidUser);
      } catch (err) {
        (0, _chai.expect)(err).to.exist;
      }
    });
  });

  describe('DataHandler create method', function () {
    var schema = { username: String, password: String, email: String, kitchens: Array };

    it('should throw an error with invalid input cases', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var testuser, User;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              testuser = { username: 'hasstrup', password: 1234, email: 'hasstrup.ezekiel@gmail.com' };
              User = new _handler2.default(schema);
              _context.next = 5;
              return User.create(testuser);

            case 5:
              return _context.abrupt('return', _context.sent);

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              (0, _chai.expect)(_context.t0).to.exist;
              (0, _chai.expect)(_context.t0.message).to.equal('Wrong datatype for field password');

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 8]]);
    })));

    it('should return a valid user object with valid input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var Parser, data, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              Parser = new _handler2.default(schema);
              data = { username: 'hasstrupezekiel', password: '1234', email: 'hasstrup.ezekiel@gmail.com', kitchens: [1, 2, 3] };
              _context2.next = 5;
              return Parser.create(data);

            case 5:
              user = _context2.sent;

              (0, _chai.expect)(user).to.have.property('username');
              (0, _chai.expect)(user.username).to.equal('hasstrupezekiel');
              (0, _chai.expect)(user.kitchens).to.be.an('array');
              (0, _chai.expect)(user.id).to.exist;
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);

              (0, _chai.expect)(_context2.t0).to.not.exist;

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 12]]);
    })));
  });

  describe('DataHandler findData methods', function () {
    var schema = { username: String, password: String, email: String, subscribers: Array };
    var User = new _handler2.default(schema);
    before(function () {
      _mock2.default.forEach(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(mock) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return User.create(mock);

                case 2:
                  return _context3.abrupt('return', _context3.sent);

                case 3:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    });

    describe('Datahandler findOne method', function () {
      it('should throw an error with invalid args', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return User.findOne(123);

              case 3:
                return _context4.abrupt('return', _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4['catch'](0);

                (0, _chai.expect)(_context4.t0).to.exist;
                (0, _chai.expect)(_context4.t0.message).to.equal('Invalid query passed, must be an object');

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined, [[0, 6]]);
      })));

      it('should throw an error when a key thats not in the schema is passed across', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return User.findOne({ unknown: 'User' });

              case 3:
                return _context5.abrupt('return', _context5.sent);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5['catch'](0);

                (0, _chai.expect)(_context5.t0.message).to.equal('unknown is not contained in the schema of this model');

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined, [[0, 6]]);
      })));

      it('should throw an error with the wrong datatype for the field in the schema', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return User.findOne({ username: 1234 });

              case 3:
                return _context6.abrupt('return', _context6.sent);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6['catch'](0);

                (0, _chai.expect)(_context6.t0).to.exist;
                (0, _chai.expect)(_context6.t0.message).to.equal('Invalid datatype passed to username');

              case 10:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[0, 6]]);
      })));

      it('should return the valid user given the right params', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var user;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return User.findOne({ username: 'ChisomRes' });

              case 3:
                user = _context7.sent;

                (0, _chai.expect)(user.id).to.equal(2);
                (0, _chai.expect)(user).to.be.an('object');
                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7['catch'](0);

                (0, _chai.expect)(_context7.t0).to.not.exist;

              case 11:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined, [[0, 8]]);
      })));

      describe('Users checkForRefs method', function () {
        it('should return the an array of refs', function () {
          var newschema = { hasstrup: 123, hasstruip: { refs: "User" }, data: { refs: 1243 }, boom: { refs: "string" }, array: [{ refs: 'User' }] };
          User.checkForRefs(newschema);
        });
      });
    });
    describe('Datahandler get Data method and population', function () {
      var Caterer = new _handler2.default({
        name: String,
        kitchens: [{ refs: 'Kitchens' }],
        vendor: { refs: 'Vendor' }
      });

      it('should return the populated corresponding fields of hasstrup', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return Caterer.create({
                  name: 'Hasstrup Ezekiel',
                  vendor: 1,
                  kitchens: [1, 2] });

              case 3:
                data = _context8.sent;
                result = Caterer.getData()[1];

                (0, _chai.expect)(result.kitchens).to.be.an('array');
                (0, _chai.expect)(result.vendor.name).to.equal('Fried fish');
                (0, _chai.expect)(result.kitchens[0].name).to.equal('Yet another smaple kitchen');
                _context8.next = 13;
                break;

              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8['catch'](0);
                throw _context8.t0;

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined, [[0, 10]]);
      })));
    });
  });
  describe('Datahandler methods from scratch', function () {
    var Kitchen = new _handler2.default({
      name: String,
      reviews: Number,
      menus: [{ refs: 'Menu' }],
      caterer: { refs: 'Users' },
      subscribers: [{ refs: 'Users' }]
    });

    var data = void 0;
    var populatedData = void 0;

    before(function () {
      Object.values(_kitchens2.default).forEach(function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(item) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return Kitchen.create(item);

                case 2:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, undefined);
        }));

        return function (_x2) {
          return _ref9.apply(this, arguments);
        };
      }());
    });
    it('Get all method should return the kitchens', function () {
      try {
        data = Kitchen.getAll();
        (0, _chai.expect)(data).to.be.an('array');
        (0, _chai.expect)(data[0].name).to.equal('Yet another smaple kitchen');
        (0, _chai.expect)(data[3].name).to.equal('akpobor kitchen');
      } catch (e) {
        (0, _chai.expect)(e).to.not.exist;
      }
    });

    it('Get all with populate args, should return populated fields', function () {
      try {
        data = Kitchen.getAll('populate');
        (0, _chai.expect)(data).to.be.an('array');
        (0, _chai.expect)(data[0].caterer).to.be.an('object');
        (0, _chai.expect)(data[0].subscribers[0]).to.be.an('object');
        (0, _chai.expect)(data[0].subscribers[0].username).to.equal('mayemusk');
      } catch (e) {
        (0, _chai.expect)(e).to.not.exist;
      }
    });

    it('findOne method should return the given data populated', function () {
      try {
        data = Kitchen.findOne({ id: 3 }, 'populate');
        (0, _chai.expect)(data).to.be.an('object');
      } catch (e) {
        (0, _chai.expect)(e).to.not.exist;
      }
    });

    it('findOneAndUpdate method should return the changed object', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return Kitchen.findOneAndUpdate({ id: 3 }, { name: 'hasstrup Kitchen' });

            case 3:
              data = Kitchen.findOne({ id: 3 });
              (0, _chai.expect)(data.name).to.be.equal('hasstrup Kitchen');
              _context10.next = 10;
              break;

            case 7:
              _context10.prev = 7;
              _context10.t0 = _context10['catch'](0);

              (0, _chai.expect)(_context10.t0).to.not.exist;

            case 10:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[0, 7]]);
    })));

    it('should delete the specified kitchen from state', function () {
      try {
        Kitchen.findOneAndDelete({ id: 3 });
        data = Kitchen.findOne({ id: 3 });
        (0, _chai.expect)(data).to.be.null;
      } catch (e) {
        (0, _chai.expect)(e).to.not.exist;
      }
    });
  });
});