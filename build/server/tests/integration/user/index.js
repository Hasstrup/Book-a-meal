'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _sinon = require('sinon');

var _chai = require('chai');

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

var _encrypt = require('../../../helpers/encrypt');

var _encrypt2 = _interopRequireDefault(_encrypt);

var _relationship = require('../../../models/v2/relationship');

var _relationship2 = _interopRequireDefault(_relationship);

var _mailers = require('../../../helpers/mailers');

var _mailers2 = _interopRequireDefault(_mailers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = _relationship2.default.User;

var res = void 0;
var token = void 0;
var data = void 0;

describe('User resources', function () {
  describe('Get requests', function () {
    it('call to / should get all the users in the db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _supertest2.default)(_index2.default).get('/api/v1/users');

            case 2:
              res = _context.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.message).to.be.an('array');

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));

    describe('Authorized methods', function () {
      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return User.findAll();

              case 2:
                data = _context2.sent;

                data = data[0].get({ plain: true });
                _context2.next = 6;
                return _encrypt2.default.issueToken({ id: data.id });

              case 6:
                token = _context2.sent;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      })));
      it('a call to update a user resource with the right authorization', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _supertest2.default)(_index2.default).put('/api/v1/users/' + data.id).set('authorization', token).send({ username: 'hasstirere' });

              case 2:
                res = _context3.sent;

                (0, _chai.expect)(res.statusCode).to.be.equal(201);
                (0, _chai.expect)(res.body.data.username).to.be.equal('hasstirere');

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      })));

      it('a call to send reset password token', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _supertest2.default)(_index2.default).post('/api/v1/users/send/reset/password').send({ email: 'hasstrup.ezekiel@gmail.com' });

              case 2:
                res = _context4.sent;

                token = res.body.data.content;
                (0, _chai.expect)(res.statusCode).to.equal(200);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      })));

      it('checking the reset password logic', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _supertest2.default)(_index2.default).get('/api/v1/users/reset/password').query({ tk: token });

              case 2:
                res = _context5.sent;

                (0, _chai.expect)(res.statusCode).to.equal(200);
                (0, _chai.expect)(res.body.data.resetPasswordCount).to.equal(1);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      })));
    });
  });
});