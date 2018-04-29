import ValidatorError from './auth/errors/validation';

/* eslint class-methods-use-this: 0 */
class BaseService {
  throwError = (message, status) => {
    throw new ValidatorError(message, status);
  }

  unAuthenticated = (message) => {
    this.throwError(message, 401);
  }

  badRequest = (message) => {
    this.throwError(message, 400);
  }

  noPermissions = (message) => {
    this.throwError(message, 403);
  }
  resourceNotFound = (message) => {
    this.throwError(message, 404);
  }

  unprocessableEntity(message) {
    this.throwError(message, 422);
  }

  checkArguments(...params) {
    if (params.length < 2 || params.length > 3 || params[0].constructor !== String) {
      return this.badRequest('Please pass in the right arguments');
    }
  }
}

export default BaseService;
