import Kitchen from './kitchen'
import User from './user';
import Menu from './menu';
import Order from './order';
import Meal from './meal';
import MealOrders from './meal-order-join'

export const modelsB = { User, Kitchen, Menu, Meal, Order, MealOrders }
// user to kitchen;
Kitchen.belongsTo(User);
User.hasOne(Kitchen, {
  onDelete: 'cascade',
  hooks: true
    });

// kitchen to menu
Kitchen.hasMany(Menu, {
  onDelete: 'cascade',
  hooks: true
});
Menu.belongsTo(Kitchen);

// Kitchen to meal
Kitchen.hasMany(Meal, {
  onDelete: 'cascade',
  hooks: true
});
Meal.belongsTo(Kitchen);

// menu should have an array of meals - no relationship;
Meal.belongsTo(Menu);
Menu.hasMany(Meal);

// Orders, should orders have manu meals?
User.hasMany(Order, {
  onDelete: 'cascade',
  hooks: true
});
Order.belongsTo(User);

// An order should have many meals and a meal can have many meals
Order.belongsToMany(Meal, { through: MealOrders });
Meal.belongsToMany(Order, { through: MealOrders });

/* eslint object-curly-newline: 0 */
const models = { Kitchen, User, Menu, Meal, Order, MealOrders };
export default models;
