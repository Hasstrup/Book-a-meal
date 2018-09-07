'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _ = require('./');

var Order = _.sequelize.define('order', {
  userId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.JSONB
  },
  id: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  }
});

exports.default = Order;