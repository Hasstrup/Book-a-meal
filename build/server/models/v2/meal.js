'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _ = require('./');

var Meal = _.sequelize.define('meal', {
  name: {
    type: _sequelize.DataTypes.STRING
  },
  description: {
    type: _sequelize.DataTypes.STRING
  },
  image: {
    type: _sequelize.DataTypes.STRING
  },
  kitchenId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  menuId: {
    type: _sequelize.DataTypes.UUID
  },
  price: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  }
});

exports.default = Meal;