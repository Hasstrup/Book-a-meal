import MenuServiceObject from '../../services/menu/';
import BaseController from '../base-controller';

let data;

/* eslint radix: 0, no-underscore-dangle: 0 */
class MenuControllerBase extends BaseController {
  fetchCatalogue = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MenuServiceObject.__fetchCatalogue();
      this.returnContent(res, data);
    }, next);
  }

  fetchSingle = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MenuServiceObject.__fetchOne('id', req.params.mmid);
      this.returnContent(res, data);
    }, next);
  }

    setMenuOfTheDay = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await MenuServiceObject.__setMenuOfTheDay(req.kitchen, req.body);
        return this.resourceCreated(res, data);
      }, next);
    }
}

const MenuController = new MenuControllerBase();

export default MenuController;
