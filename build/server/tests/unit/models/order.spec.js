'use strict';

var _chai = require('chai');

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var target = void 0;
var source = void 0;
var test = void 0;
var status = {};

var Order = _relationship2.default.Order,
    User = _relationship2.default.User,
    Meal = _relationship2.default.Meal,
    Kitchen = _relationship2.default.Kitchen;

/* eslint no-unused-expresions: 0, prefer-destructuring: 0, prefer-const: 0, object-curly-newline: 0, max-len: 0 */

describe(' Order model POSTGRES', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var kitchens;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Order.sync({ force: true });

          case 2:
            _context.next = 4;
            return Kitchen.findAll();

          case 4:
            kitchens = _context.sent;

            test = kitchens[0];

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  describe('Create Method', function () {
    before('Should return an order with valid user input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return User.findAll();

            case 2:
              source = _context2.sent;

              status['' + test.id] = false;
              data = { status: status, UserId: source[0].id };

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('Should return a order with valid user input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Order.create(data);

            case 2:
              target = _context3.sent;

              (0, _chai.expect)(target.status).to.be.an('object');

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
  });
  describe('Testing Relationship', function () {
    it('It should return the owner of the order', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return target.getUser();

            case 2:
              data = _context4.sent;

              (0, _chai.expect)(data).to.be.an('object');
              (0, _chai.expect)(data).to.have.property('username');

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it('Should return the meals belonging to an order', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Meal.findAll();

            case 2:
              source = _context5.sent;
              _context5.next = 5;
              return target.addMeal(source[0].id);

            case 5:
              _context5.next = 7;
              return target.getMeals();

            case 7:
              data = _context5.sent;

              (0, _chai.expect)(data).to.be.an('array');

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));
  });
});