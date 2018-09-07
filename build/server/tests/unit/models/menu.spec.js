'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _factories = require('../factories/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Menu = _relationship2.default.Menu,
    Kitchen = _relationship2.default.Kitchen,
    User = _relationship2.default.User;

var data = void 0;
var source = void 0;
var res = void 0;

/* eslint no-return-await: 0, no-unused-expressions: 0 */
describe(' Menu model postgres', function () {
  describe('Create functions', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Menu.sync({ force: true });

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));

    it('should create a valid menu in the database', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Kitchen.findAll();

            case 3:
              source = _context2.sent;

              data = _extends({}, _factories.validmenu, { KitchenId: source[0].id });
              _context2.next = 7;
              return Menu.create(data);

            case 7:
              res = _context2.sent;

              (0, _chai.expect)(res).to.exist;
              (0, _chai.expect)(res.name).to.equal('This is pretty awesome menu');
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2['catch'](0);

              (0, _chai.expect)(_context2.t0).to.not.exist;

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 12]]);
    })));

    it('Should throw an error with null or missing KitchenId key', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return Menu.create(_factories.validmenu);

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
  });

  describe('Menu finder methods', function () {
    it('Find all should return an array of menus', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Menu.findAll();

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

    it('Find one should return an object of data', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Menu.findOne({ where: { name: 'This is pretty awesome menu' } });

            case 2:
              data = _context5.sent;

              (0, _chai.expect)(data).to.be.an('object');
              (0, _chai.expect)(data.KitchenId).to.be.a('string');

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    describe('Menu relationships and population', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              // create a kitchen and include it in the query
              before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _ref8, _ref9;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return Kitchen.findAll();

                      case 2:
                        _ref8 = _context6.sent;
                        _ref9 = _slicedToArray(_ref8, 1);
                        res = _ref9[0];
                        _context6.next = 7;
                        return Menu.create({ name: 'This is Hasstrups sexy kitchen', description: 'This is a pretty great ting', KitchenId: res.id });

                      case 7:
                        _context6.next = 9;
                        return Menu.create({ name: 'This is another sexy Hasstrup Kitchen', description: 'This another pretty great ting', KitchenId: res.id });

                      case 9:
                        return _context6.abrupt('return', _context6.sent);

                      case 10:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              })));

              it('Find one should populate the menu with content', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return Menu.findOne({ where: { name: 'This is Hasstrups sexy kitchen' }, include: [Kitchen] });

                      case 2:
                        data = _context7.sent;

                        (0, _chai.expect)(data.Kitchen).to.be.an('object');

                      case 4:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              })));

              it('Kitchen should have an array of menus', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return Kitchen.findOne({ where: { id: res.id }, include: [Menu] });

                      case 2:
                        data = _context8.sent;

                        (0, _chai.expect)(data.Menus).to.be.an('array');
                        (0, _chai.expect)(data.Menus.length).to.equal(3);

                      case 5:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              })));

            case 3:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });
});