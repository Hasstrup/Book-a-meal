import 'babel-polyfill';
import { Op } from 'sequelize';
import BaseService from '../base-service';
import DummyMenuModel from '../../models/v1/menu';
import KitchenModel from '../../models/v1/kitchen';
import KitchenServiceObject from '../kitchens';
import models from '../../models/v2/relationship';

const { Menu, Kitchen, Meal } = models


let source;
let target;
let data;
let ref = {};

/* eslint radix: 0, no-underscore-dangle: 0, max-len: 0, no-return-await: 0, arrow-body-style: 0 */
class MenuService extends BaseService {

  // ================== methods that matter in challenge 3 ===================
  __fetchCatalogue = async () => {
    data = await Kitchen.findAll();
    data = data.map(kitchen => kitchen.ofTheDay);
    target = await Menu.findAll({ where: { id: { [Op.in]: data } }, include: [Meal, Kitchen] });
    return target;
  }

  __setMenuOfTheDay = async (kitchen, menu) => {
    return await KitchenServiceObject.__setMenuOfTheDay('id', kitchen.id, menu);
  }


  // ==================== methods that matter in challenge 2 ====================

  fetchCatalogue = () => {
    source = KitchenModel.getAll();
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

const MenuServiceObject = new MenuService(DummyMenuModel, Menu);

export default MenuServiceObject;
