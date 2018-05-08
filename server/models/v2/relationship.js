import Kitchen from './kitchen'
import User from './user';
import Menu from './menu';
import Order from './order';
import Meal from './meal';
import MealOrders from './meal-order-join'

// user to kitchen;
Kitchen.belongsTo(User);
User.hasOne(Kitchen);

// kitchen to menu
Kitchen.hasMany(Menu);
Menu.belongsTo(Kitchen);

// Kitchen to meal
Kitchen.hasMany(Meal);
Meal.belongsTo(Kitchen);

// menu should have an array of meals - no relationship;
Meal.belongsTo(Menu);
Menu.hasMany(Meal);

// Orders, should orders have manu meals?
User.hasMany(Order);
Order.belongsTo(User);

// An order should have many meals and a meal can have many meals
Order.belongsToMany(Meal, { through: MealOrders });
Meal.belongsToMany(Order, { through: MealOrders });

/* eslint object-curly-newline: 0 */
const models = { Kitchen, User, Menu, Meal, Order };
export default models;
