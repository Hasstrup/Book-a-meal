import BaseService from '../base-service';
import KitchenModel from '../../models/v1/kitchen';

let source;
let data;
let target;
let orders = [];
let obj = {};


/* eslint global-require: 0, class-methods-use-this: 0 */
class KitchenService extends BaseService {
  constructor(model) {
    super()
    this.model = model;
  }

  fetchAll(populate) {
    if (populate && populate === 'populate') {
      return this.model.getAll('populate');
    }
    return this.model.getAll();
  }

  fetchOne = (key, value, populate) => {
    this.checkArguments(key, value, populate);
    let ref = {};
    ref[`${key}`] = value;
    if (populate && populate === 'populate') {
      return this.model.findOne(ref, populate);
    }
    return this.model.findOne(ref);
  }

  getSubscribers = (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;

    return this.model.findOne(ref).subscribers;
  }

  fetchOrders = async (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    target = this.model.findOne(ref);
    return await this._getOrders(target);
  }

  fetchMenus = (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    target = this.model.findOne(ref);
    return this._getMenus(target);
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
    this._getMenus(node).forEach(async (menu) => {
      const ordersC = target.filter(order => Object.keys(order.content).includes((menu.id).toString()));
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


  updateOne = async (key, value, changes) => {
    this.checkArguments(key, value, changes);
    if ((typeof changes) !== 'object') {
      return this.unprocessableEntity('Invalid object thrown to the center');
    }
    let ref = {};
    ref[`${key}`] = value;
    return await this.model.findOneAndUpdate(ref, changes);
  }

  deleteOne = (key, value) => {
    this.checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    return this.model.findOneAndDelete(ref);
  }


}
//
const KitchenServiceObject = new KitchenService(KitchenModel);

export default KitchenServiceObject;
