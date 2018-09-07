'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

var _orders = require('../../databases/data/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var err = void 0;
var target = void 0;
var data = void 0;
var source = void 0;
/* eslint no-restricted-globals: 0, radix: 0, max-len: 0, global-require: 0 */

var OrderModelBase = function (_DataHandler) {
  _inherits(OrderModelBase, _DataHandler);

  function OrderModelBase(model) {
    var _this2 = this;

    _classCallCheck(this, OrderModelBase);

    var _this = _possibleConstructorReturn(this, (OrderModelBase.__proto__ || Object.getPrototypeOf(OrderModelBase)).call(this, model));

    _this._checkContent = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        var content;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // first check the keys of the content and make sure;
                content = input.content;

                if (content && content.constuctor === Object) {
                  Object.keys(content).forEach(function (key) {
                    if (isNaN(parseInt(key))) {
                      err = new Error('Those are wrong keys for the content');
                      err.status = 500;
                      throw err;
                    }
                  });
                  Object.values(content).forEach(function (order) {
                    if (order.items && order.processed && order.items.construtor === Array && order.processed.construtor === Boolean) {
                      return;
                    }
                    err = new Error('There is something wrong with the input');
                    err.status = 500;
                    throw err;
                  });
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this._populateContent = function (order) {
      if (!order.content) {
        err = new Error('The content passed in might be wrong');
        err.status = 500;
        throw err;
      }
      // this works for fetching users
      var iterator = order.content.constructor === Array ? order.content : Object.values(order.content);
      iterator.forEach(function (content, index) {
        data = content.items.map(function (key) {
          source = require('../../databases/data/meals').default;
          return source['' + key];
        });
        content.items = data;
        order.content['' + (index + 1)] = content;
      });
      return order;
    };

    _this.allowedQueryTypes = ['kitchen', 'user'];
    return _this;
  }
  /* This should check the input to make sure the order content matches a specific pattern */


  /* this method checks  */


  return OrderModelBase;
}(_handler2.default);

var OrderModel = new OrderModelBase({
  content: Object,
  client: { refs: 'Users' },
  quantity: Number,
  meals: Array
}, ['meals']);

// set the masterKey of the model
OrderModel.setMasterKey({ key: 'ooid', type: String });

// load some data into the database;
Object.values(_orders2.default).forEach(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(order) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return OrderModel.create(order);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = OrderModel;