'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _index = require('./index');

var _encrypt = require('../../helpers/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isString = function isString(value) {
  if (value.constructor !== String) {
    throw new Error('Invalid type for string');
  }
};

var User = _index.sequelize.define('user', {
  firstname: {
    type: _sequelize.DataTypes.STRING,
    validate: {
      isString: isString
    }
  },

  lastname: {
    type: _sequelize.DataTypes.STRING,
    validate: {
      isString: isString
    }
  },

  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isString: isString,
      isEmail: true
    }
  },

  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },

  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  avatar: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: "https://pixabay.com/en/avatar-icon-placeholder-1577909/"
  },

  confirmedEmail: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },

  resetPasswordCount: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 0
  },

  id: {
    type: _sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: _sequelize.DataTypes.UUIDV4
  }
}, {
  hooks: {
    beforeCreate: function beforeCreate(instance) {
      return instance.password = _encrypt2.default.hashPassword(instance.password);
    }
  }
});

exports.default = User;