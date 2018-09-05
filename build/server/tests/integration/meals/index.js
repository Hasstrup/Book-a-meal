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

var res = void 0;
var token = void 0;
var test = void 0;
var data = void 0;
var meals = void 0;
var Menu = _relationship2.default.Menu,
    Meal = _relationship2.default.Meal,
    User = _relationship2.default.User,
    Kitchen = _relationship2.default.Kitchen;


describe('Meal endpoints', function () {

  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findAll({ include: [Kitchen] });

          case 2:
            test = _context.sent;

            test = test[0];
            _context.next = 6;
            return _encrypt2.default.issueToken({ id: test.id });

          case 6:
            token = _context.sent;
            _context.next = 9;
            return Meal.findAll();

          case 9:
            meals = _context.sent;

            data = meals[0].get({ plain: true });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Post request to create a new meal option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest2.default)(_2.default).post('/api/v1/meals/').send({ name: 'A truly awesome kitchen', description: 'Hmmm great!', price: 4000 }).set('authorization', token);

          case 2:
            res = _context2.sent;

            data = res.body.data;
            (0, _chai.expect)(res.statusCode).to.equal(201);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.description).to.equal('Hmmm great!');

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Get meals should return all the meals belonging to a kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/meals').set('authorization', token);

          case 2:
            res = _context3.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('A get request to /:meal_id shoud fetch the required meal', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/meals/' + data.id);

          case 2:
            res = _context4.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.name).to.equal('A truly awesome kitchen');

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Put request should edit the successful meal', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/meals/' + data.id).send({ name: 'You are truly amazing' }).set('authorization', token);

          case 2:
            res = _context5.sent;

            (0, _chai.expect)(res.statusCode).to.equal(201);
            (0, _chai.expect)(res.body.data.name).to.equal('You are truly amazing');

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('Delete request should delete a meal successfully with the right token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest2.default)(_2.default).delete('/api/v1/meals/' + data.id).set('authorization', token);

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