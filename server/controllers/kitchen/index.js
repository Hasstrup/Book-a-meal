import BaseController from '../base-controller';
import KitchenModule from '../../services/kitchens/';

let data;

/* eslint radix: 0 */
class KitchenControllerBase extends BaseController {
    create = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await KitchenModule.create(parseInt(req.query.uuid), req.body);
        this.resourceCreated(res, data);
      }, next);
    }

    fetchAll = (req, res, next) => {
      this.wrapInTryCatch(() => {
        data = req.populate ? KitchenModule.fetchAll('populate') : KitchenModule.fetchAll();
        this.returnContent(res, data);
      }, next);
    }

    fetchSingle = (req, res, next) => {
      this.wrapInTryCatch(() => {
        data = req.populate ? KitchenModule.fetchOne('id', parseInt(req.params.ktid), 'populate') : KitchenModule.fetchSingle('id', parseInt(req.params.ktid));
        this.returnContent(res, data);
      }, next);
    }

    updateOne = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await KitchenModule.updateOne('id', parseInt(req.params.ktid), req.body);
        this.resourceCreated(res, data);
      }, next);
    }

    deleteOne = (req, res, next) => {
      this.wrapInTryCatch(() => {
        KitchenModule.deleteOne('id', parseInt(req.params.ktid));
        this.returnNoContent(res, 'Resource has been successfully deleted');
      }, next);
    }

    fetchOrders = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        const data = await KitchenModule.fetchOrders('id', parseInt(req.query.ktid));
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
