import DataHandler from '../../databases/handler';
import meals from '../../databases/data/meals';

class MealModelBase extends DataHandler {

}

const Meal = new MealModelBase({
  name: String,
  description: String,
  image: String,
  price: Number
}, [
  'name',
  'description',
  'price'
]);

// Loading some data into the db;
Object.values(meals).forEach(async (meal) => {
  await Meal.create(meal);
});

// set the master key to use as to validate params;
Meal.setMasterKey({ key: 'mealId', type: String });

export default Meal;
