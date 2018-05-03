import MealModel from '../../models/v1/meal';
import BaseService from '../base-service';
import Kitchen from '../../models/v1/kitchen';

let data;
let target;
let ref = {};
let meals;
let source;

/* eslint radix: 0, no-restricted-globals: 0, no-return-await: 0 , no-underscore-dangle: 0 */
class MealServiceObject extends BaseService {

  _updateKitchen = async (id, body) => {
    ref.id = id;
    target = await Kitchen.findOne(ref);
    meals = [...target.meals, body];
    await Kitchen.findOneAndUpdate(ref, { meals });
  }

  create = async (id, body) => {
    if (!id || !body || isNaN(id) || (typeof body) !== 'object') {
      return this.badRequest('please pass in the right values :)');
    }
    data = Object.assign({}, body, { owner: id });
    source = await this.model.create(data);
    await this._updateKitchen(id, source.id);
    return source;
  }
}

const MealService = new MealServiceObject(MealModel);
export default MealService;
