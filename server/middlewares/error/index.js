
/* eslint no-unused-vars: 0 */
class ErrorHandler {
  static dispatch(err, req, res, next) {
    const status = err.status ? err.status : 500;
    res.status(status).json({ error: err.message });
  }
}

export default ErrorHandler;
