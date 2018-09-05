'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

var _menu = require('../../databases/data/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuModelBase = function (_DataHandler) {
  _inherits(MenuModelBase, _DataHandler);

  function MenuModelBase() {
    _classCallCheck(this, MenuModelBase);

    return _possibleConstructorReturn(this, (MenuModelBase.__proto__ || Object.getPrototypeOf(MenuModelBase)).apply(this, arguments));
  }

  return MenuModelBase;
}(_handler2.default);

var MenuModel = new _handler2.default({
  name: String,
  owner: { refs: 'Kitchens' },
  mealOptions: [{ refs: 'Meals' }],
  image: String,
  description: String
}, ['name', 'description']);

MenuModel.setMasterKey({ key: 'mmid', type: Number });

Object.values(_menu2.default).forEach(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(menu) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return MenuModel.create(menu);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = MenuModel;