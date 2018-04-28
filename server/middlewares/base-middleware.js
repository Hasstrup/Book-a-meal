import { isEmail } from 'validator';

class BaseMiddleware {
  constructor(item) {
    }

  static checkForNullInput (req, res, next) {
    let body
    body = Object.keys(req.body);
    if (body.length) {
      Object.keys(req.body).forEach((key, index) => {
        if (Object.values(req.body)[`${index}`].toString().length < 1) {
          res.json({ message: `Empty value for ${key}` }).status(400);
          throw new TypeError(`Empty value for ${key}`);
        }
      });
    }
    next()
  }

  static checkForEmail(req, res, next) {
    if (req.body.email && req.body.email.toString().length > 1 && isEmail(req.body.email)) {
      next();
    }
    res.json({ message: 'Invalid email passed' }).status(400);
  }
}

export default BaseMiddleware
