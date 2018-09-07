'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _ = require('./');

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _meal = require('./meal');

var _meal2 = _interopRequireDefault(_meal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Kitchen = _.sequelize.define('kitchen', {
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isString: function isString(value) {
        if (value.constructor !== String) {
          throw new Error('name must be string');
        }
      }
    }
  },
  MenuofTheDay: {
    type: _sequelize.DataTypes.UUID,
    references: {
      model: _menu2.default,
      key: 'id'
    }
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: _sequelize.DataTypes.STRING
  },
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  }
}, {});

/* eslint func-names: 0, no-return-await: 0 */
Kitchen.prototype.getMenuOfTheDay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var value, menu;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = this.getDataValue('MenuofTheDay');
          _context.next = 3;
          return _menu2.default.findOne({ where: { id: value }, include: [_meal2.default] });

        case 3:
          menu = _context.sent;
          return _context.abrupt('return', menu);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

exports.default = Kitchen;