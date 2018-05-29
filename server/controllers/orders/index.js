import BaseController from '../base-controller';
import OrderService from '../../services/orders'

let data;
/* eslint radix: 0 */

class OrderControllerBase extends BaseController {
  create = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await OrderService.__create(req.user.id, req.body);
      this.resourceCreated(res, data)
    }, next);
  }

  fetchOrders = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await OrderService.__fetchAll(req.key, req.qualifier);
      this.returnContent(res, data)
    }, next);
  }

  updateOne = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await OrderService.__updateOne('id', req.params.ooid, req.target, req.qualifier, req.body);
      this.resourceCreated(res, data);
    }, next)
  }
}

const OrdersController = new OrderControllerBase();
export default OrdersController;
