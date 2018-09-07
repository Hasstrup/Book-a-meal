'use strict';

var _chai = require('chai');

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _factories = require('../factories/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _relationship2.default.User,
    Kitchen = _relationship2.default.Kitchen;


var data = void 0;
var res = void 0;
var id = void 0;

/* eslint no-unused-expressions: 0, no-return-await: 0, object-curly-newline: 0 */
describe('User model POSTGRES', function () {

  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.sync({ force: true });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  describe('Create Functions', function () {

    it('Should successfully create a user into with valid input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return User.create((0, _factories.validuser)());

            case 2:
              data = _context2.sent;


              (0, _chai.expect)(data.username).to.exist;
              (0, _chai.expect)(data.id).to.be.a('string');

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('Should reject invalid user input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return User.create(_factories.invaliduser);

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3['catch'](0);

              (0, _chai.expect)(_context3.t0).to.exist;

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 6]]);
    })));

    describe('Testing unique fields', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        res = { username: 'hasstrupezekiel', firstname: 'Hasstrup', lastname: 'Onosetale32', email: 'hasstrup.ezekiel@gmail.com', password: '123456' };
                        _context4.next = 3;
                        return User.create(res);

                      case 3:
                        data = _context4.sent;

                        // ignoring destructuring to preserve reference in lower scope;
                        /* eslint prefer-destructuring: 0 */
                        id = data.id;

                      case 5:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              })));

              it('Should reject creation of a user with the same username', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;

                        res = { username: 'hasstrupezekiel', email: 'hass@gmail.com', password: 'testpassword' };
                        _context5.next = 4;
                        return User.create(res);

                      case 4:
                        return _context5.abrupt('return', _context5.sent);

                      case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        (0, _chai.expect)(_context5.t0).to.exist;

                      case 10:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined, [[0, 7]]);
              })));

              it('Should reject creation of a user with the same email', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;

                        res = { username: 'hasstrupeze', email: 'hasstrup.ezekiel@gmail.com', password: '123456' };
                        _context6.next = 4;
                        return User.create(res);

                      case 4:
                        return _context6.abrupt('return', _context6.sent);

                      case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](0);

                        (0, _chai.expect)(_context6.t0).to.exist;

                      case 10:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined, [[0, 7]]);
              })));

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));
  });

  describe('Relationships of a User', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return Kitchen.sync({ force: true });

            case 2:
              _context8.next = 4;
              return Kitchen.create({
                name: 'This is Hasstrups test kitchen',
                description: 'Here is a test description for all my kicthens',
                UserId: id
              });

            case 4:
              res = _context8.sent;

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    it('User hasstrup ezekiel should be able to get his kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return User.findOne({ where: { username: 'hasstrupezekiel' }, include: [Kitchen] });

            case 2:
              data = _context9.sent;

              (0, _chai.expect)(data.Kitchen).to.be.an('object');
              (0, _chai.expect)(data.Kitchen.name).to.be.equal('This is Hasstrups test kitchen');

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });
});