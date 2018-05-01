import BaseService from '../base-service';
import Menu from '../../models/v1/menu';
import Kitchen from '../../models/v1/kitchen';


let source;
let target;
let data;
let ref = {};

/* eslint radix: 0, no-underscore-dangle: 0, max-len: 0 */
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

  fetchSingleMenu = (key, value) => {
    this.checkArguments(key, value);
    ref[`${key}`] = value;
    target = this.model.findOne(ref, 'populate');
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

  setMenuOfTheDay = async (key, value, menu, user) => {
    this.checkArguments(key, value, menu);
    data = await Menu.create(Object.assign({}, menu, { owner: parseInt(user.kitchen) }));
    target = await Kitchen.findOneAndUpdate({ id: parseInt(user.kitchen) }, { ofTheDay: parseInt(data.id) });
    return Kitchen.findOne({ id: parseInt(target.id) }, 'populate');
  }

}

const MenuServiceObject = new MenuService(Menu);

export default MenuServiceObject;