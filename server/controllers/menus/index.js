import MenuServiceObject from '../../services/menu/';
import BaseController from '../base-controller';

let data;

/* eslint radix: 0 */
class MenuControllerBase extends BaseController {
  fetchCatalogue = (req, res, next) => {
    this.wrapInTryCatch(() => {
      data = MenuServiceObject.fetchCatalogue();
      this.returnContent(res, data);
    }, next);
  }

  fetchSingle = (req, res, next) => {
    this.wrapInTryCatch(() => {
      data = MenuServiceObject.fetchSingleMenu('id', parseInt(req.params.mmid));
      this.returnContent(res, data);
    }, next);
  }

    setMenuOfTheDay = (req, res, next) => {
      this.wrapInTryCatch(async () => {
        data = await MenuServiceObject.setMenuOfTheDay('id', parseInt(req.query.uuid), req.body, req.user);
        return this.resourceCreated(res, data);
      }, next);
    }
}

const MenuController = new MenuControllerBase();

export default MenuController;
