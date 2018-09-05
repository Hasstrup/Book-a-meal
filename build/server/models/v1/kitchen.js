'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

var _kitchens = require('../../databases/data/kitchens');

var _kitchens2 = _interopRequireDefault(_kitchens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint global-require: 0, class-methods-use-this: 0 */
var KitchenModel = function (_DataHandler) {
  _inherits(KitchenModel, _DataHandler);

  function KitchenModel() {
    _classCallCheck(this, KitchenModel);

    return _possibleConstructorReturn(this, (KitchenModel.__proto__ || Object.getPrototypeOf(KitchenModel)).apply(this, arguments));
  }

  return KitchenModel;
}(_handler2.default);

var Kitchen = new KitchenModel({
  name: String,
  caterer: { refs: 'Users' },
  meals: [{ refs: 'Users' }],
  ofTheDay: { refs: 'Menu' },
  subscribers: [{ refs: 'Users' }],
  description: String,
  image: String,
  id: String
}, ['name', 'description']);

var data = Object.values(_kitchens2.default);
data.forEach(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(kitchen) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Kitchen.create(kitchen);

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

Kitchen.setMasterKey({ type: String, key: 'uuid' });

exports.default = Kitchen;