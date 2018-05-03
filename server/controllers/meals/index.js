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
      data = await MealServiceObject.create(parseInt(req.params.ktid), req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  updateContent = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MealServiceObject.updateOne('id', parseInt(req.query.mealId), req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  deleteContent = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      await MealServiceObject.deleteOne('id', parseInt(req.query.mealId));
      this.returnNoContent(res);
    }, next);
  }
}

const MealController = new MealControllerBase();
export default MealController;
