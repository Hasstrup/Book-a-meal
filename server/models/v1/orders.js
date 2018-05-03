import DataHandler from '../../databases/handler';
import orders from '../../databases/data/orders'

let err;
let target;
let data;
let source;
/* eslint no-restricted-globals: 0, radix: 0, max-len: 0, global-require: 0 */
class OrderModelBase extends DataHandler {
  constructor(model) {
    super(model);
    this.allowedQueryTypes = ['kitchen', 'user'];
  }
  /* This should check the input to make sure the order content matches a specific pattern */
  _checkContent = async (input) => {
    // first check the keys of the content and make sure;
    const { content } = input;
    if (content && content.constuctor === Object) {
      Object.keys(content).forEach((key) => {
        if (isNaN(parseInt(key))) {
          err = new Error('Those are wrong keys for the content');
          err.status = 500;
          throw err;
        }
      });
      Object.values(content).forEach((order) => {
        if (order.items && order.processed && order.items.construtor === Array && order.processed.construtor === Boolean) {
          return;
        }
        err = new Error('There is something wrong with the input');
        err.status = 500;
        throw err;
      });
    }
  }

  /* this method checks  */
  _populateContent = (order) => {
    if (!order.content) {
      err = new Error('The content passed in might be wrong');
      err.status = 500;
      throw err;
    }
    // this works for fetching users
    const iterator = order.content.constructor === Array ? order.content : Object.values(order.content);
    iterator.forEach((content, index) => {
      data = content.items.map((key) => {
        source = require('../../databases/data/meals').default;
        return source[`${key}`];
      });
      content.items = data;
      order.content[`${index + 1}`] = content;
    });
    return order;
  }
}

const OrderModel = new OrderModelBase({
  content: Object,
  client: { refs: 'Users' }
}, [
  'content',
]);

// set the masterKey of the model
OrderModel.setMasterKey({ key: 'ooid', type: String });

// load some data into the database;
Object.values(orders).forEach(async (order) => {
  await OrderModel.create(order);
});

export default OrderModel;
