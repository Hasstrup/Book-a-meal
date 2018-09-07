'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _ = require('../../../');

var _2 = _interopRequireDefault(_);

var _encrypt = require('../../../helpers/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Kitchen = _relationship2.default.Kitchen,
    User = _relationship2.default.User;


var res = void 0;
var data = void 0;
var test = void 0;
var source = void 0;
var token = void 0;

describe('Kitchen endpoints', function () {

  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Kitchen.findAll();

          case 2:
            source = _context.sent;

            test = source[0].get({ plain: true });
            _context.next = 6;
            return User.findAll();

          case 6:
            data = _context.sent;
            user = data[0].get({ plain: true });
            _context.next = 10;
            return _encrypt2.default.issueToken({ id: user.id, confirmedEmail: true });

          case 10:
            token = _context.sent;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it(' Get /kitchens/ should give all the kitchens in the db if logged in', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/kitchens/');

          case 2:
            res = _context2.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('should get the specific kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/kitchens/' + test.id).query({ uuid: test.id, populate: 'populate' });

          case 2:
            res = _context3.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.name).to.equal('This is Hasstrups test kitchen');
            (0, _chai.expect)(res.body.data.user).to.be.an('object');

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should accept a valid kitchen obect', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = { name: 'Hello Hasstrup Ezekiel kitchen', description: 'This is a lovely description' };
            _context4.next = 3;
            return (0, _supertest2.default)(_2.default).post('/api/v1/kitchens/').send(data).set('authorization', token);

          case 3:
            res = _context4.sent;

            (0, _chai.expect)(res.statusCode).to.equal(201);
            test = res.body.data;
            (0, _chai.expect)(res.body.data.name).to.equal('Hello Hasstrup Ezekiel kitchen');

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('call to the kitchen put endpoint should', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            data = { name: 'Hasstrup Ezekiel kitchen' };
            _context5.next = 3;
            return (0, _supertest2.default)(_2.default).put('/api/v1/kitchens/' + test.id).send(data).set('authorization', token);

          case 3:
            res = _context5.sent;

            (0, _chai.expect)(res.statusCode).to.equal(201);
            (0, _chai.expect)(res.body.data.name).to.equal('Hasstrup Ezekiel kitchen');

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('/api/ should get the delete a kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest2.default)(_2.default).delete('/api/v1/kitchens/' + test.id).set('authorization', token);

          case 2:
            res = _context6.sent;

            (0, _chai.expect)(res.statusCode).to.equal(204);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});