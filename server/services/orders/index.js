import BaseService from '../base-service';
import KitchenService from '../kitchens/';
import OrderModel from '../../models/v1/orders';

let ref = {};
let data;
let target;
/* eslint no-underscore-dangle: 0, radix: 0, max-len: 0, no-return-await: 0 */
class OrderServiceBase extends BaseService {
  constructor (model) {
    super(model);
    this.model = model;
  }
  _validateFetchAllArgs = (...args) => {
    if (args.length !== 2 || args[0].constructor !== String || args[1].constructor !== Number) {
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
      data = this.model.getAll();
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
}

const OrderService = new OrderServiceBase(OrderModel);

export default OrderService;
