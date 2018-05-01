import BaseService from '../base-service';
import KitchenModel from '../../models/v1/kitchen';
import Menu from '../../models/v1/menu';


let source;
let data;
let target;
let orders = [];
let refs = {};


/* eslint global-require: 0, class-methods-use-this: 0, prefer-const: 0, no-return-await: 0, no-underscore-dangle: 0, no-restricted-globals: 0 */
class KitchenService extends BaseService {
  constructor(model) {
    super();
    this.model = model;
  }

  create = async (id, body) => {
    if (!id || !body || isNaN(id) || (typeof body) !== 'object') {
      return this.badRequest('please pass in the right values :)');
    }
    data = Object.assign({}, body, { owner: id });
    return await this.model.create(data);
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
}
//
const KitchenServiceObject = new KitchenService(KitchenModel);

export default KitchenServiceObject;
