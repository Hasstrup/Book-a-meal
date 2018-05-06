import Kitchen from './kitchen';
import User from './user';
import Menu from './menu';
import Order from './order';
import Meal from './meal';


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

// Orders
User.hasMany(Order);
Order.belongsTo(User);

const models = { Kitchen, User, Menu, Meal };
export default models;
