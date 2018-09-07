'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _encrypt = require('../../../helpers/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _ = require('../../../');

var _2 = _interopRequireDefault(_);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _orders = require('../../../services/orders/');

var _orders2 = _interopRequireDefault(_orders);

var _menu = require('../../../services/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var res = void 0;
var valid = void 0;
var target = void 0;
var data = void 0;
var meals = void 0;
var token = void 0;
var kitchenToken = void 0;
var test = void 0;

/* eslint prefer-destructuring: 0, no-underscore-dangle: 0 */
var User = _relationship2.default.User,
    Meal = _relationship2.default.Meal,
    Kitchen = _relationship2.default.Kitchen;


describe('Orders endpoints', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var kitchen;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findAll({ include: [Kitchen] });

          case 2:
            data = _context.sent;

            data = data[1];
            _context.next = 6;
            return Kitchen.findAll({ limit: 2 });

          case 6:
            kitchen = _context.sent;
            _context.next = 9;
            return Meal.findAll({ where: { kitchenId: kitchen[0].id }, include: [{ all: true }] });

          case 9:
            target = _context.sent;

            meals = target.map(function (meal) {
              return { id: meal.id, quantity: 4, kitchenId: meal.kitchenId };
            });
            // need to add to menu of the day;
            _context.next = 13;
            return _menu2.default.__setMenuOfTheDay(kitchen[0], { name: 'This is a test', description: 'yeah this is a test', meals: meals });

          case 13:
            _context.next = 15;
            return _encrypt2.default.issueToken({ id: data.id });

          case 15:
            token = _context.sent;
            _context.next = 18;
            return _encrypt2.default.issueToken({ id: kitchen[0].userId });

          case 18:
            kitchenToken = _context.sent;
            _context.next = 21;
            return _orders2.default.__create(data.id, { meals: meals });

          case 21:
            test = _context.sent;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should fetch all the orders belonging to client 1', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/orders/').set('authorization', token).query({ type: 'user' });

          case 2:
            res = _context2.sent;

            (0, _chai.expect)(res.body.data).to.be.an('array');
            (0, _chai.expect)(res.body.data[0].userId).to.equal(data.id);
            (0, _chai.expect)(res.statusCode).to.equal(200);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Get request for the orders of a kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/orders').set('authorization', kitchenToken).query({ type: 'kitchen' });

          case 2:
            res = _context3.sent;

            (0, _chai.expect)(res.body.data).to.be.an('array');
            (0, _chai.expect)(res.statusCode).to.equal(200);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('Post request should create a new order', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            valid = { meals: meals };
            _context4.next = 3;
            return (0, _supertest2.default)(_2.default).post('/api/v1/orders/').send(valid).set('authorization', token);

          case 3:
            res = _context4.sent;

            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.userId).to.equal(data.id);
            test = res.body.data;

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Put request should change the quantity of the created item', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            valid = { quantity: 10 };
            _context5.next = 3;
            return (0, _supertest2.default)(_2.default).put('/api/v1/orders/' + test.id).set('authorization', token).send(valid).query({ type: 'user', mealId: test.meals[0].id });

          case 3:
            res = _context5.sent;

            (0, _chai.expect)(res.body.data.quantity).to.equal(10);

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('Put request should fail the without the right token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/orders/' + data.id).set('authorization', token).send(valid).query({ type: 'kitchen' });

          case 2:
            res = _context6.sent;

            (0, _chai.expect)(res.statusCode).to.equal(403);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});