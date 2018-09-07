'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _factories = require('../factories/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Kitchen = _relationship2.default.Kitchen,
    User = _relationship2.default.User;

var data = void 0;
var res = void 0;
var mockdata = void 0;
/* eslint no-unused-expressions: 0 */
describe('Kitchen model POSTGRES', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Kitchen.sync({ force: true });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  describe('Create methods of the kitchen model', function () {
    it('Create method should create a new user with a valid object', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return User.findAll();

            case 3:
              res = _context2.sent;

              mockdata = _extends({}, _factories.validKitchen, { UserId: res[0].id });
              // do the main creation here
              _context2.next = 7;
              return Kitchen.create(mockdata);

            case 7:
              data = _context2.sent;

              (0, _chai.expect)(data).to.be.an('object');
              (0, _chai.expect)(data.id).to.exist;
              (0, _chai.expect)(data.name).to.equal('Hasstrups Test Kitchen');
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](0);

              (0, _chai.expect)(_context2.t0).to.not.exist;

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 13]]);
    })));

    it('Create method should throw an error with invalid data', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return Kitchen.create(_factories.invalidKitchen);

            case 3:
              data = _context3.sent;
              _context3.next = 9;
              break;

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
  });

  describe('Kitchen find method', function () {
    it('Find One method should retrieve an object from the db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Kitchen.findOne({ where: { name: 'Hasstrups Test Kitchen' } });

            case 3:
              data = _context4.sent;

              (0, _chai.expect)(data).to.exist;
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4['catch'](0);

              (0, _chai.expect)(_context4.t0).to.not.exist;

            case 10:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 7]]);
    })));

    it('Find All shoud return an array of kitchens', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return Kitchen.findAll();

            case 3:
              data = _context5.sent;

              (0, _chai.expect)(data).to.be.an('array');
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5['catch'](0);

              (0, _chai.expect)(_context5.t0).to.not.exist;

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 7]]);
    })));
  });

  describe('Kitchen relationships and population', function () {
    it('Should return the user object related to a user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return Kitchen.findOne({ where: { name: 'Hasstrups Test Kitchen' }, include: [User] });

            case 2:
              data = _context6.sent;

              (0, _chai.expect)(data).to.exist;
              (0, _chai.expect)(data.User).to.be.an('object');

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));
  });
});