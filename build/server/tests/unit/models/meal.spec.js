'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chai = require('chai');

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Meal = _relationship2.default.Meal,
    Kitchen = _relationship2.default.Kitchen,
    Menu = _relationship2.default.Menu;

var source = void 0;
var target = void 0;
var data = void 0;

/* eslint object-curly-newline: 0, no-unused-expressions: 0 */
describe('Meal model Postgres', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Meal.sync({ force: true });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  describe('Create function', function () {
    it('Should inject a valid meal into the database', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Kitchen.findAll();

            case 2:
              source = _context2.sent;
              _context2.next = 5;
              return Meal.create({ name: 'Fried Rice and Banku', description: 'This is the FriedRice andd Banku ting', KitchenId: source[0].id, price: 2000 });

            case 5:
              target = _context2.sent;

              (0, _chai.expect)(target).to.be.an('object');
              (0, _chai.expect)(target.name).to.equal('Fried Rice and Banku');

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));
  });

  it('Should reject invalid meal', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Meal.create({});

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

  describe('Meal find methods', function () {
    it('Find all should return an array of meals', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Meal.findAll();

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

    it('Find One should return an object of meal', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Meal.findOne({ where: { id: target.id } });

            case 2:
              data = _context5.sent;

              (0, _chai.expect)(data).to.be.an('object');
              (0, _chai.expect)(data.name).to.equal('Fried Rice and Banku');

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));
  });

  describe('Relationships of the meal', function () {
    it('Get Kitchen(owner) of the meal Bi-directional', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return Meal.findOne({ where: { id: target.id }, include: [Kitchen] });

            case 2:
              data = _context6.sent;

              (0, _chai.expect)(data.Kitchen).to.be.an('object');

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    it('The Kitchen should have meals Bi-directional', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return Kitchen.findOne({ where: { id: source[0].id }, include: [Menu, Meal] });

            case 2:
              data = _context7.sent;

              (0, _chai.expect)(data.Menus).to.be.an('array');
              (0, _chai.expect)(data.Meals).to.be.an('array');
              (0, _chai.expect)(data.Meals.length).to.be.above(0);

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));
  });

  describe(' Menu to meal relationship', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return Menu.findAll();

            case 2:
              source = _context8.sent;
              _context8.next = 5;
              return Meal.findOne({ where: { id: target.id } });

            case 5:
              data = _context8.sent;
              _context8.next = 8;
              return data.update({ MenuId: source[0].id });

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));
    it('Menu relationship with meals', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var _source, _source2, a;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _source = source, _source2 = _slicedToArray(_source, 1), a = _source2[0];
              _context9.t0 = _chai.expect;
              _context9.next = 4;
              return data.getMenu();

            case 4:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.be.an('object');
              _context9.t2 = _chai.expect;
              _context9.next = 9;
              return a.getMeals();

            case 9:
              _context9.t3 = _context9.sent;
              (0, _context9.t2)(_context9.t3).to.be.an('array');

            case 11:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });
});