import BaseService from '../base-service';
import User from '../../models/v1/user';

const ref = {};

class UserService extends BaseService {
  constructor(model) {
    super();
    this.model = model;
  }

  fetchAll = (populate) => {
    if (populate && populate === 'populate') {
      return this.model.getAll('populate');
    }
    return this.model.getAll();
  }


  fetchSingle = (key, value, populate) => {
    if (!key || !value || (typeof key) !== 'string') {
      return this.badRequest('please send in a key of type string and a value');
    }
    ref[`${key}`] = value;
    if (populate && populate === 'populate') {
      return this.model.findOne(ref, 'populate');
    }
    return this.model.findOne(ref);
  }

  /* eslint no-return-await: 0 */
  updateOne = async (key, value, changes) => {
    if (!key || !value || (typeof key) !== 'string' || (typeof changes) !== 'object') {
      return this.badRequest('Please send in the right input values');
    }
    ref[`${key}`] = value;
    return await this.model.findOneAndUpdate(ref, changes);
  }

  deleteOne = async (key, value) => {
    if (!key || !value || (typeof key) !== 'string') {
      return this.badRequest('Please send in the right input values');
    }
    ref[`${key}`] = value;
    return await this.model.findOneAndDelete(ref);
  }
}

const UserServiceObject = new UserService(User);

export default UserServiceObject;
