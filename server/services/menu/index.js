import BaseService from '../base-service';
import MenuModel from '../../models/v1/menu';
import Kitchen from '../../models/v1/kitchen';


let source;
let target;
let data;
let ref = {};
/* eslint radix: 0 */
class MenuService extends BaseService {
  constructor(model) {
    super(model);
    this.model = model;
  }

  fetchCatalogue = () => {
    source = Kitchen.getAll();
    target = source.map(kitchen => this.model.findOne({ id: parseInt(kitchen.ofTheDay) }));
    return target;
  }

  fetchMeals = (key, value) => {
    this.checkArguments(key, value);
    ref[`${key}`] = value;
    return this._getMeals(ref);
  }

  _getMeals = (node) => {
    if (!node.meals || node.meals.length < 1) {
      return this.unprocessableEntity('Sorry theres nothing contained in thie menu');
    }
    return node.meals.map(item => Meals.findOne({ id: `${item}` }));
  }

}

const MenuServiceObject = new MenuService(MenuModel);

export default MenuServiceObject;
