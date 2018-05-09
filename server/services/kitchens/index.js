import BaseService from '../base-service';
import KitchenModel from '../../models/v1/kitchen';
import models from '../../models/v2/relationship';

const { Kitchen, Menu, Order, Meal } = models;

let source;
let data;
let dataTree;
let target;
let orders = [];
let refs = {};
let mealPresent = false;


/* eslint global-require: 0, class-methods-use-this: 0, prefer-const: 0, no-return-await: 0, no-underscore-dangle: 0, no-restricted-globals: 0, object-curly-newline: 0 */
class KitchenService extends BaseService {
  create = async (id, body) => {
    if (!id || !body || (typeof body) !== 'object') {
      return this.badRequest('please pass in the right values :)');
    }
    data = Object.assign({}, body, { UserId: id });
    return await this.__model.create(data);
  }

  fetchAll = async (populate) => {
    if (populate && populate === 'populate') {
      return await this.__model.findAll({ include: [{ all: true }] });
    }
    return await this.__model.findAll();
  }

  fetchOne = async (key, value, populate) => {
    this.checkArguments(key, value, populate);
    let ref = {};
    ref[`${key}`] = value;
    if (populate && populate === 'populate') {
      return await this.__model.findOne({ where: ref, include: [{ all: true }] });
    }
    return await this.__model.findOne({ where: ref });
  }

  // The logic should be to fetch all the orders and include
  __fetchOrders = async (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    target = await this.__model.findOne({ where: ref });
    ref[`${key}`] = value;
    source = await Order.findAll({ include: { model: Meal, include: [Kitchen] } });
    // so source  returns an array of Meals in the Meals field since it's 1:m rel
    dataTree = source.filter(order => Object.keys(order.status).includes(target.name));
    // remember to filter the order's content
    return dataTree;
  }

  __fetchMenus = async (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    target = await this.__model.findOne({ where: ref, include: [Menu] });
    return target.Menus;
  }

  _getMenus = (node) => {
    if (!node || (typeof node) !== 'object') {
      this.badRequest('Please send in a correct node');
    }
    source = require('../../databases/data/menu').default;
    data = Object.values(source).filter(item => item.owner === node.id);
    return data;
  }

  /* eslint max-len: 0 */
  _getOrders = async (node) => {
    target = Object.values(require('../../databases/data/orders').default);
    this._getMenus(node).forEach((menu) => {
      const ordersC = target.filter(order => Object.keys(order.content).includes((menu.id.toString())));
      orders = [...ordersC];
      return orders;
    });
    // knock off unneccesay detail attached to the order;
    const final = orders.map((item) => {
      const content = this._getMenus(node).map(menu => item.content[`${menu.id}`]).filter(object => object);
      return Object.assign({}, item, { content });
    });
    return final;
  }


  __updateOne = async (key, value, changes) => {
    this.checkArguments(key, value, changes);
    if ((typeof changes) !== 'object') {
      return this.unprocessableEntity('Invalid object thrown to the center');
    }
    let ref = {};
    ref[`${key}`] = value;
    data = await this.__model.findOne({ where: ref });
    return await data.update(changes);
  }

  __deleteOne = async (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.__model.findOne({ where: ref });
    return await data.destroy();
  }

  setMenuOfTheDay = async (key, value, newMenu) => {
    this.checkArguments(key, value);
    // check the owner;
    let ref = {};
    ref[`${key}`] = value;
    refs.id = newMenu.ofTheDay;
    data = Menu.findOne(refs);
    target = this.model.findOne(ref);
    if (data && target && data.owner === target.id) {
      return await this.model.findOneAndUpdate(ref, newMenu);
    }
    this.noPermissions('You do not have permissions to do that');
  }

  __setMenuOfTheDay = async (key, value, newMenu) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;

    // find the kitchen
    source = await this.__model.findOne({ where: ref });
    if (source) {
      data = {};
      // filter out the unique fields to avoid a conflict when it tries to create;
      Object.keys(newMenu).forEach((item) => {
        const arr = ['id', 'createdAt', 'updatedAt', 'meals'];
        if (!arr.includes(item)) {
          data[`${item}`] = newMenu[`${item}`];
        }
      });

      // the meals will be an array of meal objects // check the meals to see if the kitchen is the owner;
      if (newMenu.meals) {
        const { meals } = newMenu;
        meals.forEach((meal) => {
          const { KitchenId } = meal;
          if (KitchenId !== source.id) {
            let err;
            err = new Error(`You do not own this meal : ${meal.name}`);
            err.status = 401;
            throw err
          }
          mealPresent = true;
        });
      }

      // Try finding or creating the menu;
      await Menu.findOrCreate({
        where: { name: data.name, KitchenId: source.id },
        defaults: { ...data, KitchenId: source.id }
      }).spread(async (menu) => {
        if (mealPresent) {
          await menu.addMeals(newMenu.meals);
        }
        await source.update({ ofTheDay: menu.id });
      });
      return await source.getMenuOfTheDay();
    }
    // throw an error if there is no kitchen like that
    this.unprocessableEntity('Sorry we couldnt find any kitchen like that');
  }
}

const KitchenServiceObject = new KitchenService(KitchenModel, Kitchen);

export default KitchenServiceObject;
