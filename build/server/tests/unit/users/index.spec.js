'use strict';

var _chai = require('chai');

var _users = require('../../../services/users/');

var _users2 = _interopRequireDefault(_users);

var _encrypt = require('../../../helpers/encrypt/');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var token = void 0;

describe('User service object', function () {
  it('Get all users, should return all the content in the models store', function () {
    var data = _users2.default.fetchAll();
    (0, _chai.expect)(data).to.be.an('array');
    (0, _chai.expect)(data[0].username).to.equal('hasstrupezekiel123');
  });

  it('Get a particular user when fed a query', function () {
    var data = _users2.default.fetchSingle('id', 5);
    (0, _chai.expect)(data.username).to.equal('beyhouston');
    (0, _chai.expect)(data.kitchen).to.equal(5);
  });
  /* eslint no-unused-expressions: 0, no-shadow: 0, prefer-destructuring: 0, no-underscore-dangle: 0, max-len: 0 */
  it('updateSingle should update the particuler user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var changes, _data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            changes = { username: 'ohmydearariana' };
            _context.next = 4;
            return _users2.default.updateOne('id', 4, changes);

          case 4:
            _data = _context.sent;

            (0, _chai.expect)(_data.username).to.equal('ohmydearariana');
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            (0, _chai.expect)(_context.t0).to.not.exist;

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  })));

  it('should delete the select item', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _users2.default.deleteOne('id', 5);

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);

            (0, _chai.expect)(_context2.t0).to.not.exist;

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 6]]);
  })));

  describe(' Extra methods - reset password and confirm email', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _users2.default.__model.findAll();

            case 2:
              data = _context3.sent;

              data = data[0];

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('__resetPassword should reset the password of a user on first try and fail done again', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _encrypt2.default.issueToken({ id: data.id, resetPasswordCount: data.resetPasswordCount });

            case 3:
              token = _context4.sent;
              _context4.next = 6;
              return _users2.default.__resetPassword(token);

            case 6:
              data = _context4.sent;

              (0, _chai.expect)(data.resetPasswordCount).to.equal(1);
              _context4.next = 10;
              return _users2.default.__resetPassword(token);

            case 10:
              _context4.next = 16;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4['catch'](0);

              (0, _chai.expect)(_context4.t0).to.exist;
              (0, _chai.expect)(_context4.t0.message).to.equal('Sorry this token is expired or has invalid content');

            case 16:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 12]]);
    })));

    it('__confirmEmail should seconirm the email of the test user and invalidate after', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _users2.default.__confirmEmail(token);

            case 3:
              data = _context5.sent;

              (0, _chai.expect)(data.confirmedEmail).to.be.true;
              _context5.next = 7;
              return _users2.default.__confirmEmail(token);

            case 7:
              token = _context5.sent;
              _context5.next = 14;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](0);

              (0, _chai.expect)(_context5.t0).to.exist;
              (0, _chai.expect)(_context5.t0.message).to.equal('Seems like youve confirmed your email prior to now');

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 10]]);
    })));
  });
});