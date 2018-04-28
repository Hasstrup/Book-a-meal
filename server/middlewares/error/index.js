
class ErrorHandler {
  static dispatch(err, req, res, next) {
    let status = err.status ? err.status : 500
    res.status(status).json({ error: err.message });
  }

  static dispatchRE() {
    return this.dispatch
  }
}

export default ErrorHandler
