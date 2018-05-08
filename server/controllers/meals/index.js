import MealServiceObject from '../../services/meals/';
import BaseController from '../base-controller';

let data;

/* eslint radix: 0, no-underscore-dangle: 0 */

class MealControllerBase extends BaseController {
  fetchSingle = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MealServiceObject.__fetchOne('id', req.params.mealId);
      this.returnContent(res, data);
    }, next);
  }

  fetchMealsForKitchen = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MealServiceObject.__fetchMealsForKitchen(req.kitchen);
      this.returnContent(res, data);
    }, next);
  }

  create = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MealServiceObject.__create(req.kitchen.id, req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  updateContent = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      data = await MealServiceObject.__updateOne('id', req.params.mealId, req.body);
      this.resourceCreated(res, data);
    }, next);
  }

  deleteContent = (req, res, next) => {
    this.wrapInTryCatch(async () => {
      await MealServiceObject.__deleteOne('id', req.params.mealId);
      this.returnNoContent(res);
    }, next);
  }
}

const MealController = new MealControllerBase();
export default MealController;
