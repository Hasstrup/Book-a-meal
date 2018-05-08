import BaseController from '../base-controller';
import KitchenModule from '../../services/kitchens/';

let data;

/* eslint radix: 0 */
class KitchenControllerBase extends BaseController {
    create = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await KitchenModule.create(req.user.id, req.body);
        this.resourceCreated(res, data);
      }, next);
    }

    fetchAll = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = req.populate ? await KitchenModule.fetchAll('populate') : await KitchenModule.fetchAll();
        this.returnContent(res, data);
      }, next);
    }

    fetchSingle = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = req.populate ? await KitchenModule.fetchOne('id', req.params.ktid, 'populate') : await KitchenModule.fetchSingle('id', req.params.ktid);
        this.returnContent(res, data);
      }, next);
    }

    updateOne = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await KitchenModule.__updateOne('id', req.params.ktid, req.body);
        this.resourceCreated(res, data);
      }, next);
    }

    deleteOne = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        await KitchenModule.__deleteOne('id', req.params.ktid);
        this.returnNoContent(res, 'Resource has been successfully deleted');
      }, next);
    }

    fetchOrders = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        const data = await KitchenModule.fetchOrders('id', req.query.ktid);
        this.returnContent(res, data);
      }, next);
    }

    fetchMenus = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        const data = await KitchenModule.fetchMenus('id', parseInt(req.query.ktid));
        this.returnContent(res, data);
      }, next);
    }

    fetchSubscribers = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        const data = await KitchenModule.fetchMenus('id', parseInt(req.query.ktid));
        this.returnContent(res, data);
      }, next);
    }
}

const KitchenController = new KitchenControllerBase();
export default KitchenController;
