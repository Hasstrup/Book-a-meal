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
  };
}

export default AuthModule;
