import ValidatorError from './errors/validation';

class AuthModule {
  constructor(model) {
    if (model) {
      this.model = model;
    }
  }

  static signUp(body, model = this.model) {
    /* This method checks for null values that are required,
      then checks that the corresponding value matches the constructor */
      let baseData = {};
    model.required.forEach((key) => {
      if (body[`${key}`] && JSON.stringify(body[`${key}`]).split('').length > 0 && body[`${key}`].constructor === model.keys[`${key}`]) {
        return;
      }
      throw new ValidatorError(`${key} is either missing or invalid`, 422);
    });
    /* then attempts to create the user */
    if(model.keys && model.create){
       Object.keys(model).keys.forEach((key) => {
         if(body[`${key}`] && body[`${key}`].constructor === model[`${key}`])
       })
    }

  }
}

export default AuthModule;
