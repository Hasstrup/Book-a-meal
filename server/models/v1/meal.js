import DataHandler from '../../databases/handler';

class MealModelBase extends DataHandler {

}

const Meal = new MealModelBase({
  name: String,
  description: String,
  image: String
}, [
  'name',
  'description'
]);

export default Meal;
