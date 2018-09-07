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

var Menu = _relationship2.default.Menu,
    User = _relationship2.default.User,
    Kitchen = _relationship2.default.Kitchen,
    Meal = _relationship2.default.Meal;


var res = void 0;
var test = void 0;
var data = void 0;
var token = void 0;
var meals = void 0;

describe('Menu routes and endpoints', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Menu.findAll();

          case 2:
            res = _context.sent;

            data = res[0].get({ plain: true });
            _context.next = 6;
            return User.findAll({ include: [Kitchen] });

          case 6:
            test = _context.sent;

            test = test.map(function (item) {
              return item.get({ plain: true });
            });
            test = test[0];
            _context.next = 11;
            return _encrypt2.default.issueToken({ id: test.id });

          case 11:
            token = _context.sent;
            _context.next = 14;
            return Meal.findAll({ include: [{ all: true }] });

          case 14:
            meals = _context.sent;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('A call to the base route should return an array of menu of the days', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/menus/').set('authorization', token);

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

  it('a call to fetch single should return the valid menu', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/menus/' + data.id).set('authorization', token);

          case 2:
            res = _context3.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.name).to.equal('This is pretty awesome menu');

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should set the menu of the day for a user with a kitchen, FAIL CASE', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = { name: 'This is the menu of the day', description: 'Here it is neccessary', meals: meals };
            _context4.next = 3;
            return (0, _supertest2.default)(_2.default).post('/api/v1/menus').set('authorization', token).send(data);

          case 3:
            res = _context4.sent;

            (0, _chai.expect)(res.statusCode).to.equal(401);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});