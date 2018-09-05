'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = require('../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

var _users = require('../../databases/data/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModel = exports.UserModel = function (_DataHandler) {
  _inherits(UserModel, _DataHandler);

  function UserModel() {
    _classCallCheck(this, UserModel);

    return _possibleConstructorReturn(this, (UserModel.__proto__ || Object.getPrototypeOf(UserModel)).apply(this, arguments));
  }

  _createClass(UserModel, [{
    key: 'getOrders',

    /* eslint global-require: 0 */
    /* eslint class-methods-use-this: 0 */
    value: function getOrders(node) {
      var dataSource = require('../../databases/data/orders');
      var data = Object.values(dataSource);
      var target = data.filter(function (item) {
        return item.client === node.id;
      });
      return target;
    }
  }]);

  return UserModel;
}(_handler2.default);

var User = new UserModel({
  username: String,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  kitchen: { refs: 'Kitchens' },
  orders: [{ refs: 'Orders' }],
  phone: Number,
  created: Date
}, ['username', 'email', 'password', 'firstname']);

// Load some data into the store;
Object.values(_users2.default).forEach(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.create(user);

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

User.setMasterKey({ key: 'uuid', type: Number });
exports.default = User;