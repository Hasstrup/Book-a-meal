import BaseService from '../base-service';

class AuthModule extends BaseService {
  constructor(model) {
    super();
    if (model) {
      this.model = model;
    }
  }

  signUp = async (body, model = this.model) => {
    /* This method checks for null values that are required,
      then checks that the corresponding value matches the constructor */
    const baseData = {};
    model.required.forEach((key) => {
      if (body[`${key}`] && JSON.stringify(body[`${key}`]).split('').length > 0 && body[`${key}`].constructor === model.keys[`${key}`]) {
        return;
      }
      this.unprocessableEntity(`${key} is either missing or invalid`);
    });
    if (model.keys && model.create) {
      Object.keys(model.keys).forEach((key) => {
        if (body[`${key}`] && body[`${key}`].constructor === model.keys[`${key}`]) {
          baseData[`${key}`] = body[`${key}`];
          return;
        } else if (!body[`${key}`] && (model.keys[`${key}`].constructor === Array || model.keys[`${key}`].constructor === Object)) {
          if (model.keys[`${key}`].constructor === Array) {
            baseData[`${key}`] = [];
            return;
          }
          baseData[`${key}`] = null;
        }
        baseData[`${key}`] = null;
      });
      /* eslint no-return-await: 0 */
      return await model.create(baseData);
    }
  }

  authenticate = async (user, baseModel = this.model) => {
    /* check for missing fields in the user input */
    let data;
    let target;
    let validuser;

    if (Object.values(user).length >= 2) {
      // check the data in the baseModel;
      data = baseModel.getAll();
      target = data.filter(item => item.username === user.username);
      if (target.length < 1) {
        this.unprocessableEntity('No record found with such user');
      }
      /* eslint prefer-destructuring: 0 */
      validuser = target[0];
      if (validuser.password === user.password) {
        return true;
      }
      this.noPermissions('Invalid username and password combination');
    }
    this.unprocessableEntity('Certain required fields are missing');
  }
}


export default AuthModule;
