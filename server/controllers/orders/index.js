import BaseController from '../base-controller';
import OrderService from '../../services/orders'

let data;
/* eslint radix: 0 */

class OrderControllerBase extends BaseController {
  create = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await OrderService.create(parseInt(req.query.uuid), req.body);
      this.resourceCreated(res, data)
    }, next);
  }

  fetchOrders = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await OrderService.fetchAll(req.qualifier, parseInt(req.key))
      this.returnContent(res, data)
    }, next);
  }

  updateOne = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await OrderService.updateOne('id', parseInt(req.query.ktid), 2);
      this.resourceCreated(res, data);
    }, next)
  }
}

const OrdersController = new OrderControllerBase();
export default OrdersController;
