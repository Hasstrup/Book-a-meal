'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var invalidData = void 0;
var validData = void 0;
var res = void 0;

/* eslint no-unused-expressions: 0 */
describe('API - Authentication routes', function () {
  describe('Sign auth api', function () {
    it('should respond  with 404', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              invalidData = { username: 'String', password: 'Onosetale32', email: 1234 };
              _context.next = 3;
              return (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send(invalidData);

            case 3:
              res = _context.sent;

              (0, _chai.expect)(res.statusCode).to.equal(422);
              (0, _chai.expect)(res.body.error).to.exist;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));
    /* eslint object-curly-newline: 0 */
    it('should respond with the current user and 201 with validData', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              validData = { username: 'testUsername', password: 'Onosetale32', email: 'hasstrup.eze@gmail.com', firstname: 'HasstrupEzekiel' };
              _context2.next = 3;
              return (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send(validData);

            case 3:
              res = _context2.sent;

              (0, _chai.expect)(res.statusCode).to.equal(201);
              (0, _chai.expect)(res.body.data.username).to.equal('testUsername');

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));
  });

  describe('Log in method - int', function () {
    it('should reject an invalid request with status 422', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              invalidData = { username: 'Teststs', password: 'onosetale' };
              _context3.next = 3;
              return (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send(invalidData);

            case 3:
              res = _context3.sent;

              (0, _chai.expect)(res.statusCode).to.equal(422);
              (0, _chai.expect)(res.body.error).to.exist;

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('should log in the user with a response code of 200 and message', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              validData = { email: 'hasstrup.eze@gmail.com', password: 'Onosetale32' };
              _context4.next = 3;
              return (0, _supertest2.default)(_index2.default).post('/api/v1/auth/login').send(validData);

            case 3:
              res = _context4.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data).to.exist;

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));
  });
});