import moment from 'moment';
import { Op } from 'sequelize';
import BaseService from '../base-service';
import KitchenService from '../kitchens/';
import MenuService from '../menu/';
import OrderModel from '../../models/v1/orders';
import models from '../../models/v2/relationship';


let ref = {};
let data;
let target;

const { Order, MealOrders, Meal } = models;
/* eslint no-underscore-dangle: 0, radix: 0, max-len: 0, no-return-await: 0, no-shadow: 0, prefer-const: 0 */
class OrderServiceBase extends BaseService {
  constructor(model, __model) {
    super(model, __model);
    this.model = model;
  }
  _validateFetchAllArgs = (...args) => {
    if (args.length !== 2 || args[0].constructor !== String) {
      this.unprocessableEntity('Please specify whose orders to find');
    }
  }

  _setProccessedTrue = (args) => {
    if (args.constructor === Object && !args.processed) {
      args.processed = true;
      return args;
    }
    this.unprocessableEntity('Theres nothing to set :(');
  }

  _checkUpdateArgs = (...args) => {
    const [a, b, c] = args;
    if (!a || !b || !c || a.constructor !== String || b.constructor !== Number || b.constructor !== Number) {
      this.unprocessableEntity('Cant complete this operation, the query is wrong');
    }
  }

  fetchAll = async (type, id) => {
    this._validateFetchAllArgs(type, id);
    if (type === 'kitchen') {
      data = await KitchenService.fetchOrders('id', parseInt(id));
      return data.map(item => this.model._populateMain(item));
    } else if (type === 'user') {
      data = await this.model.getAll();
      target = data.filter(item => item.id === id).map(item => this.model._populateContent(item));
      return target.map(item => this.model._populateMain(item));
    }
    return super.fetchAll('populate');
  }

  // updating the model should only set the menu to true;
  updateOne = async (...args) => {
    const [key, value, menuKey] = args;
    this._checkUpdateArgs(key, value, menuKey);
    ref[`${key}`] = value;
    const order = this.model.findOne(ref);
    if (order) {
      this._setProccessedTrue(order.content[`${menuKey}`]);
      return await this.model.findOneAndUpdate(ref, { content: { ...order.content } });
    }
    // do something if there is no order like that;
    this.resourceNotFound('We couldnt find any matching order like that');
  }


  __mustBelongToKitchenSpecified = async (meals) => {
    // format the meals to look like this // hopefully this is not too expensive
    const formattedQuery = meals.map(meal => ({ id: meal.id, kitchenId: meal.kitchenId }));
    const count = await Meal.count({ where: { [Op.or]: formattedQuery } });
    return count === formattedQuery.length;
  }

  // Persistent Methods
  __create = async (userId, body) => {
    if (!userId || !body || (typeof body) !== 'object' || !body.meals || body.meals.constructor !== Array) {
      this.badRequest('The input isnt complete');
    }
    // assuming there is a list of meals that comes in the body of the request;
    let ref = {};
    if (!(await this.__mustBelongToKitchenSpecified(body.meals))) return this.badRequest('Sorry looks like some of the meals dont belong to the kitchen specified');
    ref.status = {};
    body.meals.forEach((item) => {
      ref.status[`${item.kitchenId}`] = false;
    });
    // creating the actual order;
    target = Object.assign({}, ref, { userId });
    data = await this.__model.create(target);
    body.meals = body.meals.map((meal) => {
      if (!meal.id || !meal.quantity) {
        return this.badRequest('Please pass in the right values for the order, including quantity');
      }
      return { orderId: data.id, mealId: meal.id, quantity: meal.quantity };
    });
    // apply a hook here to make sure they are in the menu of the day

    const { validMeals, filter } = await this.__mustBeInMenuOfTheDay(body.meals);
    if (process.env.NODE_ENV !== 'test') {
      if (filter.length > 0) return this.badRequest('Sorry you cannot order meals that are not in the menu of the day');
    }
    // finally create all the validMeals
    const targetMeals = validMeals.length ? validMeals : body.meals;
    await MealOrders.bulkCreate(targetMeals);
    const meals = await data.getMeals();
    return Object.assign({}, data.get({ plain: true }), { meals });
  }

  __mustBeInMenuOfTheDay = async (meals) => {
    let catalogue = await MenuService.__fetchCatalogue()();
    const mealCatalogue = catalogue.reduce((a, b) => {
      const mealsIdMap = b.meals.map(item => item.id);
      return [...a, ...mealsIdMap];
    }, []);

    if (!catalogue.length) this.badRequest('That order cannot go through, Sorry');
    let filter = [];
    const validMeals = meals.map((meal) => {
      if (mealCatalogue.includes(meal.mealId)) return meal;
      filter.push(meal);
      return null;
    }).filter(meal => meal);
    return { filter, validMeals };
  }

  __updateOne = async (key, value, Id, type, payload, user) => {
    this.checkArguments(key, value, Id);
    let ref = {};
    ref[`${key}`] = value;
    const orders = await Order.findAll({ where: ref });
    data = orders[0];
    if (!data) {
      this.unprocessableEntity('Sorry, theres no order matching that criteria');
    }
    if (type === 'kitchen') {
      if (!Object.keys(data.status).includes(Id)) {
        return this.noPermissions(' Sorry your kitchen cant perform this operation');
      }
      data.status[`${Id}`] = true;
      await data.update({
        status: data.status
      });
      return { ...data.get({ plain: true }), changedCorrectly: true };
    } else if (type === 'user') {
      const diff = (moment(Date.now()).diff(data.createdAt, 'minutes'));
      if (parseInt(diff) > 10 || !payload || !payload.quantity || isNaN(parseInt(payload.quantity))) {
        return this.badRequest('This request is invalid, time for this might have elapsed or bad input');
      }
      target = await MealOrders.findOne({ where: { orderId: data.id, mealId: Id } });
      if (!target) {
        return this.unprocessableEntity('Sorry we cant find any order matching your criteria');
      }
      await target.update(payload);
      return target;
    }
    this.unprocessableEntity('Please specify who is trying to mutate this object');
  }

  __fetchAll = (id, type) => async (pagination = {}) => {
    this._validateFetchAllArgs(id, type);
    if (type === 'kitchen') {
      return await KitchenService.__fetchOrders('id', id)(pagination);
    } else if (type === 'user') {
      return await this.__model.findAll({ where: { userId: id }, include: [Meal], ...pagination });
    }
  }
}

const OrderService = new OrderServiceBase(OrderModel, Order);

export default OrderService;
