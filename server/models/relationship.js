import Kitchen from './kitchen';
import User from './user';
import Menu from './menu';
const models;

Kitchen.belongsTo(User);
Menu.belongsTo(Kitchen);

models = { Kitchen, User }
export default models
