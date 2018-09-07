'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _ = require('./');

var MealOrders = _.sequelize.define('mealOrder', {
  orderId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  mealId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 1
  }
});

exports.default = MealOrders;