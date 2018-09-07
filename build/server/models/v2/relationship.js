'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationship = exports.modelsB = undefined;

var _kitchen = require('./kitchen');

var _kitchen2 = _interopRequireDefault(_kitchen);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _meal = require('./meal');

var _meal2 = _interopRequireDefault(_meal);

var _mealOrderJoin = require('./meal-order-join');

var _mealOrderJoin2 = _interopRequireDefault(_mealOrderJoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modelsB = exports.modelsB = { User: _user2.default, Kitchen: _kitchen2.default, Menu: _menu2.default, Meal: _meal2.default, Order: _order2.default, MealOrders: _mealOrderJoin2.default };
// user to kitchen;
var relationship = exports.relationship = function relationship() {
  _kitchen2.default.belongsTo(_user2.default);
  _user2.default.hasOne(_kitchen2.default, {
    onDelete: 'cascade',
    hooks: true
  });

  // kitchen to menu
  _kitchen2.default.hasMany(_menu2.default, {
    onDelete: 'cascade',
    hooks: true
  });
  _kitchen2.default.belongsTo(_menu2.default, { foreignKey: 'MenuofTheDay' });
  _menu2.default.belongsTo(_kitchen2.default);

  // Kitchen to meal
  _kitchen2.default.hasMany(_meal2.default, {
    onDelete: 'cascade',
    hooks: true
  });
  _meal2.default.belongsTo(_kitchen2.default);

  // menu should have an array of meals - no relationship;
  _meal2.default.belongsTo(_menu2.default);
  _menu2.default.hasMany(_meal2.default);

  // Orders, should orders have manu meals?
  _user2.default.hasMany(_order2.default, {
    onDelete: 'cascade',
    hooks: true
  });
  _order2.default.belongsTo(_user2.default);

  // An order should have many meals and a meal can have many meals
  _order2.default.belongsToMany(_meal2.default, { through: _mealOrderJoin2.default });
  _meal2.default.belongsToMany(_order2.default, { through: _mealOrderJoin2.default });
  return { Kitchen: _kitchen2.default, User: _user2.default, Menu: _menu2.default, Meal: _meal2.default, Order: _order2.default, MealOrders: _mealOrderJoin2.default };
};

/* eslint object-curly-newline: 0 */
var models = { Kitchen: _kitchen2.default, User: _user2.default, Menu: _menu2.default, Meal: _meal2.default, Order: _order2.default, MealOrders: _mealOrderJoin2.default };
exports.default = relationship();