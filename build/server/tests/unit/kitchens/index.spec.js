'use strict';

var _chai = require('chai');

var _kitchens = require('../../../services/kitchens');

var _kitchens2 = _interopRequireDefault(_kitchens);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Kitchen = _relationship2.default.Kitchen,
    Menu = _relationship2.default.Menu;


var source = void 0;
var test = void 0;
var data = void 0;
var testMenu = void 0;

describe('Kitchen Service Object', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Kitchen.findAll();

          case 2:
            source = _context.sent;

            test = source[0];
            _context.next = 6;
            return Menu.findAll();

          case 6:
            data = _context.sent;

            testMenu = data[0];

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
  it('Get All should return all the kitchens in the mainstore', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _kitchens2.default.fetchAll();

          case 2:
            data = _context2.sent;

            (0, _chai.expect)(data[0]).to.be.an('object');

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _kitchens2.default.fetchOne('id', data[0].id);

          case 2:
            data = _context3.sent;

            (0, _chai.expect)(data.UserId).to.exist;

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('fetch Orders should return the orders contaiing the kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _kitchens2.default.__fetchOrders('id', test.id);

          case 2:
            data = _context4.sent;

            (0, _chai.expect)(data).to.be.an('array');

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Get menus should return all the menus belonging to a user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _kitchens2.default.__fetchMenus('id', test.id);

          case 2:
            data = _context5.sent;

            (0, _chai.expect)(data).to.be.an('array');

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('updateone should update the details of a kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _kitchens2.default.__updateOne('id', test.id, { name: 'Otse CookSpot' });

          case 2:
            data = _context6.sent;

            (0, _chai.expect)(data.name).to.equal('Otse CookSpot');

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  it('Set menu of the day should change the menu of the day', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _kitchens2.default.__setMenuOfTheDay('id', test.id, testMenu.get({ plain: true }));

          case 2:
            data = _context7.sent;

            (0, _chai.expect)(data.id).to.be.a('string');

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  it('deleteOne should delete specfied object', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _kitchens2.default.__deleteOne('id', test.id);

          case 2:
            _context8.t0 = _chai.expect;
            _context8.next = 5;
            return _kitchens2.default.__fetchOne('id', test.id);

          case 5:
            _context8.t1 = _context8.sent;
            (0, _context8.t0)(_context8.t1).to.be.null;

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));
});