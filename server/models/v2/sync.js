import models,  { modelsB } from './relationship';
import User from './user';
import Kitchen from './kitchen';
import Meal from './meal';
import Order from './order';
import Menu from './menu';
import MealOrder from './meal-order-join';


const sync = async () => {
  await User.sync({ force: true });
  await Kitchen.sync({ force: true });
  await Menu.sync({ force: true });
  await Meal.sync({ force: true });
  await Order.sync({ force: true })
  await MealOrder.sync({ force: true });
  Object.values(models).forEach(async (model) => {
    await model.sync({ force: true });
    console.log(`${model.name} Relationship has been synced to the db`);
  });
};

export default sync;
