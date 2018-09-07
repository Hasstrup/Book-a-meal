import { relationship } from './relationship';
import User from './user';
import Kitchen from './kitchen';
import Meal from './meal';
import Order from './order';
import Menu from './menu';
import MealOrder from './meal-order-join';


const sync = async () => {
  try {
    await User.sync({ force: true });
    await Menu.sync({ force: true });
    await Kitchen.sync({ force: true });
    await Meal.sync({ force: true });
    await Order.sync({ force: true });
    await MealOrder.sync({ force: true });
    await relationship();
  } catch (e) {
    console.log(e);
  }
};

export default sync;
