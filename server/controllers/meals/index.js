import MealServiceObject from '../../services/meals/';
import BaseController from '../base-controller';
let data;

/* eslint radix: 0 */

class MealControllerBase extends BaseController {

  fetchSingle = (req, res, next) => {
    this.wrapInTryCatch(() => {
      data = MealServiceObject.fetchOne('id', parseInt(req.params.mealId));
      this.returnContent(res, data);
    }, next);
  }

  create = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MealServiceObject.create(parseInt(req.kitchen.id), req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  updateContent = (req, res, next) => res
}

const MealController = new MealControllerBase()
export default MealController
