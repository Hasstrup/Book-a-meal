'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _relationship = require('./relationship');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _kitchen = require('./kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _meal = require('./meal');

var _meal2 = _interopRequireDefault(_meal);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _mealOrderJoin = require('./meal-order-join');

var _mealOrderJoin2 = _interopRequireDefault(_mealOrderJoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sync = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user2.default.sync({ force: true });

          case 3:
            _context.next = 5;
            return _menu2.default.sync({ force: true });

          case 5:
            _context.next = 7;
            return _kitchen2.default.sync({ force: true });

          case 7:
            _context.next = 9;
            return _meal2.default.sync({ force: true });

          case 9:
            _context.next = 11;
            return _order2.default.sync({ force: true });

          case 11:
            _context.next = 13;
            return _mealOrderJoin2.default.sync({ force: true });

          case 13:
            _context.next = 15;
            return (0, _relationship.relationship)();

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 17]]);
  }));

  return function sync() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = sync;