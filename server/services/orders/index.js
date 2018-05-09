import moment from 'moment';
import BaseService from '../base-service';
import KitchenService from '../kitchens/';
import OrderModel from '../../models/v1/orders';
import models from '../../models/v2/relationship';



let ref = {};
let data;
let target;

const { Order, MealOrders } = models;
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


  // Persistent Methods
  __create = async (UserId, body) => {
    if (!UserId || !body || (typeof body) !== 'object' || !body.meals) {
      this.badRequest('The input isnt complete :(');
    }
    // assuming there is a list of meals that comes in the body of the request;
    let ref = {};
    Object.keys(body).forEach((key) => {
      if (key !== 'meals') {
        ref[`${key}`] = body[`${key}`];
      }
    });
    ref.status = {};
    // map the kitchen into the ref array // so that kitchens are sorted automatically
    body.meals.forEach((item) => {
      ref.status[`${item.kitchen}`] = false;
    });
    // creating the actual order;
    target = Object.assign({}, ref, { UserId });
    data = await this.__model.create(target);
    // await data.addMeals(body.meals);
    body.meals = body.meals.map((meal) => {
      return { OrderId: data.id, MealId: meal.id, quantity: meal.quantity };
    });
    await MealOrders.bulkCreate(body.meals);
    const meals = await data.getMeals();
    return Object.assign({}, data.get({ plain: true }), { meals });
  }


  __updateOne = async (key, value, Id, type, payload) => {
    this.checkArguments(key, value, Id);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.__model.findOne({ where: ref });
    if (!data) {
      this.unprocessableEntity('Sorry, theres no order matching that criteria');
    }
    if (type === 'kitchen') {
      data.status[`${Id}`] = true;
      await data.update({
        status: data.status
      });
      return { ...data.get({ plain: true }), changedCorrectly: true };
    } else if (type === 'user') {
      const diff = (moment().diff(data.createdAt, 'minutes'));
      if (parseInt(diff) > 10 || !payload || !payload.quantity || payload.quantity.constructor !== Number) {
        return this.badRequest('This request is invalid, time for this might have elapsed or bad input');
      }
      target = await MealOrders.findOne({ where: { OrderId: data.id, MealId: Id } });
      if (!target) {
        return this.unprocessableEntity('Sorry we cant find any order matching your criteria');
      }
      await target.update(payload);
      return target;
    }
    this.unprocessableEntity('Please specify who is trying to mutate this object');
  }

  __fetchAll = async (id, type) => {
    this._validateFetchAllArgs(id, type);
    if (type === 'kitchen') {
      return await KitchenService.__fetchOrders('id', id);
    } else if (type === 'user') {
      return await this.__model.findAll({ where: { UserId: id } });
    }
  }
}

const OrderService = new OrderServiceBase(OrderModel, Order);

export default OrderService;
