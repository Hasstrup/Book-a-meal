'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _index = require('./index');

var Menu = _index.sequelize.define('Menu', {
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  KitchenId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Kitchens',
      key: 'id'
    }
  },
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  }
});

exports.default = Menu;