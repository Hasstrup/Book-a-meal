'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var token = void 0;

var Encrypt = function () {
  function Encrypt() {
    _classCallCheck(this, Encrypt);
  }

  _createClass(Encrypt, null, [{
    key: 'hashStr',

    /* eslint no-bitwise: 0, no-plusplus: 0, no-return-await: 0, arrow-body-style: 0 */
    value: function hashStr(str) {
      var hash = 0;
      if (str.length === 0) return hash;
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash;
    }
  }]);

  return Encrypt;
}();

Encrypt.hashPassword = function (str) {
  return _bcrypt2.default.hashSync(str, 10);
};

Encrypt.checkPassword = function (str, passwordHash) {
  return _bcrypt2.default.compareSync(str, passwordHash);
};

Encrypt.issueToken = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken2.default.sign(payload, 'YoudontreallyknowKanye');

          case 2:
            token = _context.sent;
            return _context.abrupt('return', token);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

Encrypt.decodeToken = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(jwtoken) {
    var payload;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _jsonwebtoken2.default.verify(jwtoken, 'YoudontreallyknowKanye');

          case 2:
            payload = _context2.sent;
            return _context2.abrupt('return', payload);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = Encrypt;