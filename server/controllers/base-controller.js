/* this is bunch of helper methods for all controllers , response methods
  these should be implicitly tested with the integration tests;
*/

/* eslint class-methods-use-this: 0 */
class BaseController {
  async wrapInTryCatch(func, next) {
    try {
      return await func();
    } catch (e) {
      next(e);
    }
  }

  resourceCreated(res, data) {
    res.status(201).json({ data });
  }

  responseOkay(res, message) {
    res.status(200).json({ message });
  }

  returnNoContent(res, message) {
    res.status(204).json({ message });
  }
}
export default BaseController;
