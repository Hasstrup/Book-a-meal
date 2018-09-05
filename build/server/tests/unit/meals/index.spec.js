'use strict';

var _chai = require('chai');

var _meals = require('../../../services/meals');

var _meals2 = _interopRequireDefault(_meals);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var valid = void 0;
var data = void 0;
var testkitchen = void 0;
var target = void 0;

var Kitchen = _relationship2.default.Kitchen,
    User = _relationship2.default.User;


describe('Meal service Object', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findAll();

          case 2:
            data = _context.sent;

            target = data[0];
            _context.next = 6;
            return Kitchen.create({ name: 'Bay and Ruts', description: 'A really expensive restaurant on the island', UserId: target.id });

          case 6:
            testkitchen = _context.sent;

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
  it('Create method should return the valid created meal', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            valid = { name: 'This is a pretty awesome meal', description: 'This is an awesome meal, how nice', price: 2000 };
            _context2.next = 3;
            return _meals2.default.create(1, valid);

          case 3:
            data = _context2.sent;

            (0, _chai.expect)(data.name).to.equal('This is a pretty awesome meal');
            (0, _chai.expect)(data.description).to.equal('This is an awesome meal, how nice');

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Read method should fetch the particular meal option', function () {
    data = _meals2.default.fetchOne('id', 11);
    (0, _chai.expect)(data).to.be.an('object');
    (0, _chai.expect)(data.name).to.equal('Fried Rice and Menu and whoop');
  });

  it('Delete method should delete a certain object in the data array', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _meals2.default.deleteOne('id', 11);

          case 2:
            (0, _chai.expect)(_meals2.default.fetchOne('id', 11)).to.be.null;

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('Update method should delete a certain object in the data', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _meals2.default.updateOne('id', 12, { name: 'Hello sexyy Hasstrup' });

          case 2:
            data = _context4.sent;

            (0, _chai.expect)(data.name).to.equal('Hello sexyy Hasstrup');

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('__create should create the method and persist to the database', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _meals2.default.__create(testkitchen.id, valid);

          case 2:
            data = _context5.sent;

            (0, _chai.expect)(data).to.have.property('name');
            (0, _chai.expect)(data.name).to.equal('This is a pretty awesome meal');

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));
});