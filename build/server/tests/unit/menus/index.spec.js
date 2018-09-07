'use strict';

var _chai = require('chai');

var _menu = require('../../../services/menu');

var _menu2 = _interopRequireDefault(_menu);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Kitchen = _relationship2.default.Kitchen,
    User = _relationship2.default.User;


var data = void 0;
var target = void 0;
var testKitchen = void 0;

describe('Menu Service Object', function () {
  it('Get All should return all the menus in the mock store', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _menu2.default.fetchAll();

          case 2:
            data = _context.sent;

            (0, _chai.expect)(data[0]).to.be.an('object');
            (0, _chai.expect)(data[0].name).to.be.equal('Fried rice and fish');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', function () {
    data = _menu2.default.fetchOne('id', 4);
    (0, _chai.expect)(data.owner).to.equal(4);
    (0, _chai.expect)(data.mealOptions).to.include(4);
  });

  it('updateone should update the details of a kitchen', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _menu2.default.updateOne('owner', 7, { name: 'Otse CookSpot' });

          case 2:
            data = _context2.sent;

            (0, _chai.expect)(data.name).to.equal('Otse CookSpot');

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('deleteOne should delete specfied object', function () {
    _menu2.default.deleteOne('owner', 9);
    (0, _chai.expect)(_menu2.default.fetchOne('owner', 9)).to.be.null;
  });

  it('getCatalogue should return an array of menus of the day', function () {
    data = _menu2.default.fetchCatalogue();
    (0, _chai.expect)(data).to.be.an('array');
    (0, _chai.expect)(data[0]).to.be.an('object');
  });

  it('create a menu should return the menu with the valid input', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = { name: 'This is Hasstrups kitchen', description: 'This is actually an awesome meal' };
            _context3.next = 3;
            return _menu2.default.create(5, data);

          case 3:
            target = _context3.sent;

            (0, _chai.expect)(target).to.be.an('object');
            (0, _chai.expect)(target.name).to.equal('This is Hasstrups kitchen');
            (0, _chai.expect)(target.owner).to.equal(5);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
  /* eslint prefer-destructuring: 0, no-underscore-dangle: 0 */
  describe('DB Method calls', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return User.findAll();

            case 2:
              data = _context4.sent;

              target = data[0];
              // create a new test kitchen;
              _context4.next = 6;
              return Kitchen.create({ name: 'Bay and Ruts', description: 'A really expensive restaurant on the island', UserId: target.id });

            case 6:
              testKitchen = _context4.sent;

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it('__create method should persist data new menus to my db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = { name: 'This is a pretty nice meal you know', description: 'Aloha this is pretty great', KitchenId: testKitchen.id };
              _context5.next = 3;
              return _menu2.default.__create(data);

            case 3:
              target = _context5.sent;

              (0, _chai.expect)(target.name).to.equal('This is a pretty nice meal you know');

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('__fetchAll should return an array of menus from my db along with its', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _menu2.default.__fetchAll();

            case 2:
              data = _context6.sent;

              (0, _chai.expect)(data).to.be.an('array');
              (0, _chai.expect)(data[0].Meals).to.be.an('array');

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    it(' __fetchone should retreove the populated data from the db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _menu2.default.__fetchOne('name', 'This is pretty awesome menu');

            case 2:
              data = _context7.sent;

              (0, _chai.expect)(data).to.be.an('object');
              (0, _chai.expect)(data.id).to.exist;

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    it('__updateOne should update the table', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _menu2.default.__updateOne('name', 'This is pretty awesome menu', { name: 'Hasstrups awesome menu' });

            case 2:
              data = _context8.sent;

              (0, _chai.expect)(data.name).to.equal('Hasstrups awesome menu');

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    it('__deleteOne should delete the specified items in the table', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _menu2.default.__deleteOne('name', 'Hasstrups awesome menu');

            case 2:
              data = _context9.sent;
              _context9.next = 5;
              return _menu2.default.__fetchOne('name', 'Hasstrups awesome menu');

            case 5:
              target = _context9.sent;

              (0, _chai.expect)(target).to.be.null;

            case 7:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });
});