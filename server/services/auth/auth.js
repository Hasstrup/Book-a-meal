import ValidatorError from './errors/validation';

class AuthModule {
  constructor(model) {
    if (model) {
      this.model = model;
    }
  }

  static async signUp(body, model = this.model) {
    /* This method checks for null values that are required,
      then checks that the corresponding value matches the constructor */
    let baseData = {};
    model.required.forEach((key) => {
      if (body[`${key}`] && JSON.stringify(body[`${key}`]).split('').length > 0 && body[`${key}`].constructor === model.keys[`${key}`]) {
        return;
      }
      throw new ValidatorError(`${key} is either missing or invalid`, 422);
    });

    /* then attempts to create the user after matching
     the datatypes and checking the required fields */
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
      return await model.create(baseData);
    }
  }

  static authenticate(user, baseModel = this.model) {
    /* check for missing fields in the user input */
    let data;
    let target;
    let validuser;

    if (Object.values(user).length >= 2) {
      // check the data in the baseModel;
      data = baseModel.getAll();
      target = data.filter(item => item.username === user.username);
      if (target.length < 1) {
        throw new ValidatorError('No record found with such user', 404);
      }
      validuser = target[0];
      if (validuser.password === user.password) {
        return true;
      }
      throw new ValidatorError('Invalid username and password combination', 403);
    }
    throw new ValidatorError('incomplete or misssing fields', 422);
  }
}

export default AuthModule;