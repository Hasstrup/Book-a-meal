'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _relationship = require('./relationship');

var _relationship2 = _interopRequireDefault(_relationship);

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user2.default.sync({ force: true });

          case 2:
            _context2.next = 4;
            return _kitchen2.default.sync({ force: true });

          case 4:
            _context2.next = 6;
            return _menu2.default.sync({ force: true });

          case 6:
            _context2.next = 8;
            return _meal2.default.sync({ force: true });

          case 8:
            _context2.next = 10;
            return _order2.default.sync({ force: true });

          case 10:
            _context2.next = 12;
            return _mealOrderJoin2.default.sync({ force: true });

          case 12:
            Object.values(_relationship2.default).forEach(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return model.sync({ force: true });

                      case 2:
                        console.log(model.name + ' Relationship has been synced to the db');

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function sync() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = sync;