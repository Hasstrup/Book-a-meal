'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _orders = require('../../../services/orders/');

var _orders2 = _interopRequireDefault(_orders);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var target = void 0;
var source = void 0;

/* eslint no-unused-expressions: 0, no-underscore-dangle: 0, prefer-destructuring: 0, prefer-const: 0, max-len: 0, arrow-body-style: 0, object-curly-newline: 0 */
var User = _relationship2.default.User,
    Meal = _relationship2.default.Meal,
    Order = _relationship2.default.Order;


describe('Order service object', function () {
  it(' The fetch all method should return the details for the kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _orders2.default.fetchAll('user', 2);

          case 2:
            data = _context.sent;

            (0, _chai.expect)(data).to.be.an('array');
            (0, _chai.expect)(data[0].content['1'].items[0].name).to.equal('Fried Rice and Menu & what not');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should update one should only update the processed part of the order owned by the kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _orders2.default.updateOne('id', 1, 2);

          case 2:
            data = _context2.sent;

            (0, _chai.expect)(data.content['2'].processed).to.be.true;

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('create method should return the valid data fail case', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            target = { client: 2, content: { items: [2, 4, 5], processed: true } };
            _context3.next = 4;
            return _orders2.default.create(target);

          case 4:
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

  it('create method should return the valid object', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            target = { client: 1, content: { 1: { items: [0, 1, 2], processed: false } } };
            _context4.next = 3;
            return _orders2.default.create(1, target);

          case 3:
            data = _context4.sent;

            (0, _chai.expect)(data.content).to.be.an('object');
            (0, _chai.expect)(data.id).to.equal(3);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  describe(' DB Persistent methods', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return User.findAll();

            case 2:
              data = _context5.sent;

              target = data[0];
              _context5.next = 6;
              return Meal.findAll();

            case 6:
              source = _context5.sent;

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('__create method should create a new object in the database', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var status;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              status = {};

              source = source.map(function (item) {
                return { id: item.id, quantity: Math.floor(Math.random() * 10), kitchen: item.KitchenId };
              });
              _context6.next = 5;
              return _orders2.default.__create(target.id, { meals: source, status: status });

            case 5:
              data = _context6.sent;

              (0, _chai.expect)(data).to.be.an('object');
              _context6.next = 12;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6['catch'](0);

              (0, _chai.expect)(_context6.t0).to.not.exist;

            case 12:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 9]]);
    })));

    it('__updateOne should change the status of a kitchen to processed or not', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _orders2.default.__updateOne('id', data.id, source[0].kitchen, 'kitchen');

            case 2:
              data = _context7.sent;

              (0, _chai.expect)(data.status['' + source[0].kitchen]).to.equal(true);

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    it('__updateOne should change the quantity of an item in an order in the db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _orders2.default.__updateOne('id', data.id, source[0].id, 'user', { quantity: 7 });

            case 2:
              data = _context8.sent;

              (0, _chai.expect)(data.quantity).to.equal(7);

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    it('__updateOne shoud fail if 10 minutes have elapsed', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var stub1, date;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              stub1 = (0, _sinon.stub)(Order, 'findOne');
              date = (0, _moment2.default)().subtract(12, 'm');

              stub1.returns({ createdAt: date });
              _context9.next = 6;
              return _orders2.default.__updateOne('id', data.id, source[0].id, 'user', { quantity: 7 });

            case 6:
              data = _context9.sent;
              _context9.next = 13;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9['catch'](0);

              (0, _chai.expect)(_context9.t0).to.exist;
              (0, _chai.expect)(_context9.t0.message).to.equal('This request is invalid, time for this might have elapsed or bad input');

            case 13:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[0, 9]]);
    })));
  });
});