"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* this is bunch of helper methods for all controllers , response methods
  these should be implicitly tested with the integration tests;
*/

/* eslint class-methods-use-this: 0 */
var BaseController = function () {
  function BaseController() {
    _classCallCheck(this, BaseController);
  }

  _createClass(BaseController, [{
    key: "wrapInTryCatch",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(func, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return func();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);

                if (_context.t0.errors && !_context.t0.status) {
                  _context.t0.message = _context.t0.errors[0].path + " is either null or invalid, please check";
                  _context.t0.status = 400;
                }
                next(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function wrapInTryCatch(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return wrapInTryCatch;
    }()
  }, {
    key: "resourceCreated",
    value: function resourceCreated(res, data) {
      res.status(201).json({ data: data });
    }
  }, {
    key: "returnContent",
    value: function returnContent(res, data) {
      res.status(200).json({ data: data });
    }
  }, {
    key: "responseOkay",
    value: function responseOkay(res, message) {
      res.status(200).json({ message: message });
    }
  }, {
    key: "returnNoContent",
    value: function returnNoContent(res, message) {
      res.status(204).json({ data: { message: message } });
    }
  }, {
    key: "responseMessageAndData",
    value: function responseMessageAndData(res, data, message) {
      res.status(200).json({ data: { content: data, message: message } });
    }
  }]);

  return BaseController;
}();

exports.default = BaseController;