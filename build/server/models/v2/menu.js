'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _index = require('./index');

var Menu = _index.sequelize.define('menu', {
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  kitchenId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  }
});

exports.default = Menu;