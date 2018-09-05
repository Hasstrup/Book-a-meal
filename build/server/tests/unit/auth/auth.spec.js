'use strict';

require('babel-polyfill');

var _chai = require('chai');

var _auth = require('../../../services/auth/auth');

var _auth2 = _interopRequireDefault(_auth);

var _handler = require('../../../databases/handler');

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BaseModel = new _handler2.default({
  username: String,
  password: String,
  firstname: String,
  email: String,
  kitchen: Number
}, ['username', 'email', 'password']);

var invalidData = void 0;
var validData = void 0;

describe('Authentication Module', function () {
  describe('Auth sign up method  cases', function () {
    it('should throw an error with incomplete Data', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              invalidData = { username: 'hasstrup', email: 'hasstrup.ezekiel@gmail.com' };
              _context.next = 4;
              return _auth2.default.signUp(invalidData, BaseModel);

            case 4:
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);

              (0, _chai.expect)(_context.t0.status).to.equal(422);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 6]]);
    })));
    /* eslint no-unused-expressions: 0 */
    it('should throw an error with a misatched datatype', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              invalidData = {
                username: 1,
                password: 'String',
                email: 'h@user.com'
              };
              _context2.next = 4;
              return _auth2.default.signUp(invalidData);

            case 4:
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              (0, _chai.expect)(_context2.t0).to.exist;
              (0, _chai.expect)(_context2.t0.status).to.equal(422);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 6]]);
    })));

    it('should return the correct data with the password encrypted(Success case)', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var newuser;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              validData = {
                username: 'hasstrupezekielbro',
                password: '123456',
                email: 'hellopaperstack@gmail.com',
                firstname: 'HasstrupEzekiel'
              };
              _context3.next = 4;
              return _auth2.default.signUp(validData);

            case 4:
              newuser = _context3.sent;

              (0, _chai.expect)(newuser.username).to.equal('hasstrupezekielbro');
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](0);

              (0, _chai.expect)(_context3.t0).to.not.exist;

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 8]]);
    })));
  });

  describe('Auth login method', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var test;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              test = [{
                username: 'hasstrup',
                password: 'Onosetale',
                email: 'hasstrup@gmail.com',
                firstname: 'Hasstrup'
              }, {
                username: 'chisomezekeil',
                password: 'thisisatestpassword',
                email: 'hasstrup.ezekiel12@gmail.com',
                firstname: 'This is pretty cool'
              }];
              _context5.next = 3;
              return test.forEach(function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(item) {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return _auth2.default.signUp(item);

                        case 2:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, undefined);
                }));

                return function (_x) {
                  return _ref5.apply(this, arguments);
                };
              }());

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('should return throw an error when passed an invalid login details', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              invalidData = { username: 'hasstrupezekiel', password: 'Onosetale32' };
              _context6.next = 4;
              return _auth2.default.authenticate(invalidData);

            case 4:
              _context6.next = 10;
              break;

            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6['catch'](0);

              (0, _chai.expect)(_context6.t0).to.exist;
              (0, _chai.expect)(_context6.t0.status).to.equal(422);

            case 10:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 6]]);
    })));

    it('should return the valid user with a valid user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var auth;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;

              validData = { email: 'hellopaperstack@gmail.com', password: '123456' };
              _context7.next = 4;
              return _auth2.default.__authenticate(validData);

            case 4:
              auth = _context7.sent;

              (0, _chai.expect)(auth).to.be.an('object');
              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7['catch'](0);

              (0, _chai.expect)(_context7.t0).to.not.exist;

            case 11:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 8]]);
    })));
  });
});