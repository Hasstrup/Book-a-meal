"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-unused-vars: 0 */
var ErrorHandler = function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);
  }

  _createClass(ErrorHandler, null, [{
    key: "dispatch",
    value: function dispatch(err, __, res, _) {
      var status = err.status ? err.status : 500;
      res.status(status).json({ error: err.message });
    }
  }]);

  return ErrorHandler;
}();

exports.default = ErrorHandler;