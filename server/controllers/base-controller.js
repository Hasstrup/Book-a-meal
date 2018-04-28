/* this is bunch of helper methods for all controllers , response methods
  these should be implicitly tested with the integration tests;
*/

/* eslint class-methods-use-this: 0 */
class BaseController {

  async wrapInTryCatch(func) {
    try {
      return await func();
    } catch (e) {
      throw e.message;
    }
  }

  invalidRequest(res, message) {
    res.json({ message }).status(400);
  }

  ForbiddenRequest(res, message) {
    res.json({ message }).status(403);
  }

  unauthorizedRequest(res, message) {
    res.json({ message }).status(401);
  }

  resourceNotFound(res, message) {
    res.json({ message }).status(404);
  }

  internalServerError(res, message) {
    res.json({ message }).status(500);
  }

  creaatedSuccessfully(res, data) {
    res.json({ data }).status(201);
  }

  requestProcessed(res, data) {
    if (data) {
      return res.json({ data }).status(200);
    }
    res.json({}).status(200);
  }

  processedButNoContent(res) {
    res.json({}).status(204);
  }
}
export default BaseController;
