'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-underscore-dangle: 0 */
/**

*/

var DataHandler = function () {
  function DataHandler(initData) {
    var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, DataHandler);

    this._addTimeStamps = function (data) {
      return Object.assign({}, data, { created: Date.now() });
    };

    if ((typeof initData === 'undefined' ? 'undefined' : _typeof(initData)) !== 'object') {
      throw new TypeError('invalid input passed into datahandler');
    }
    this.validateInit(initData);
    this.data = {};
    this.required = required;
  }

  /**
   * [validateInit description]
   * @param  {[type]} input [This checks that the input ]
   * @return {[type]}       [description]
   */


  _createClass(DataHandler, [{
    key: 'validateInit',
    value: function validateInit(input) {
      this.hooks = [String, Number, Object, Array, Date, Boolean];
      var vals = Object.values(input);
      var StringHooks = this.hooks.map(function (item) {
        return JSON.stringify(item);
      });
      var mappedValues = vals.map(function (value) {
        if (StringHooks.includes(JSON.stringify(value)) || StringHooks.includes(JSON.stringify(value.constructor))) {
          return 1;
        }
        return 0;
      });
      var mappedKeys = Object.keys(input);
      if (mappedValues.includes(0)) {
        throw new TypeError('invalid input ' + vals[mappedValues.indexOf(0)] + ' for ' + mappedKeys[mappedValues.indexOf(0)]);
      }
      this.keys = input;
      this.refs = this.checkForRefs(input);
    }
  }, {
    key: 'setMasterKey',
    value: function setMasterKey(key) {
      // ensure that key is a number;
      if (!key || (typeof key === 'undefined' ? 'undefined' : _typeof(key)) !== 'object' || !key.key || !key.type) {
        throw TypeError('The key has to be present and has to have a value and type');
      }
      this.masterKey = key;
    }

    /* eslint class-methods-use-this: 0 */
    /* eslint no-new-object: 0 */

  }, {
    key: 'checkForRefs',
    value: function checkForRefs(input) {
      var vals = Object.values(input);
      var values = Object.keys(input).map(function (item, index) {
        var log = new Object();
        log['' + item] = vals[index];
        return log;
      });
      this.refsMultiple = this.checkForMultipleRefs(input);
      var refs = {};
      var valss = values.filter(function (item) {
        return _typeof(Object.values(item)[0]) === 'object' && Object.values(item)[0].refs && Object.values(item)[0].refs.constructor === String;
      });
      valss.forEach(function (item) {
        refs['' + Object.keys(item)[0]] = Object.values(item)[0].refs;
      });
      this.refs = refs;
      return this.refs;
    }

    // check has_many associations

  }, {
    key: 'checkForMultipleRefs',
    value: function checkForMultipleRefs(input) {
      var vals = Object.values(input);
      var values = Object.keys(input).map(function (item, index) {
        if (vals[index].constructor === Array && vals[index][0].refs) {
          var log = new Object();
          log['' + item] = vals[index];
          return log;
        }
        return null;
      });
      var ref = {};
      values.filter(function (item) {
        return item;
      }).forEach(function (item) {
        ref['' + Object.keys(item)[0]] = Object.values(item)[0][0].refs;
      });
      return ref;
    }

    /* This method checks if the query is an object, after doing that,
    it checks if the field is registered in the schema, then matches the data types */

  }, {
    key: 'validateQuery',
    value: function validateQuery(query) {
      if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) !== 'object') {
        throw new TypeError('Invalid query passed, must be an object');
      } else if (Object.keys(query)[0] === 'id' && Object.values(query)[0].constructor === Number) {
        return true;
      } else if (this.refs['' + Object.keys(query)] && Object.values(query)[0].constructor === Number) {
        return true;
      } else if (!Object.keys(this.keys).includes(Object.keys(query)[0])) {
        throw new TypeError(Object.keys(query)[0] + ' is not contained in the schema of this model');
      } else if (Object.values(query)[0].constructor !== this.keys['' + Object.keys(query)[0]]) {
        throw new TypeError('Invalid datatype passed to ' + Object.keys(query)[0]);
      } else {
        return true;
      }
    }

    /* This item gets all the items in the internal state and then populates the fields
    if the populate argument is passed
     */

  }, {
    key: 'getAll',
    value: function getAll(populate) {
      var data = Object.values(this.data);
      if (populate && populate === 'populate') {
        return Object.values(this.getData(this.data));
      }
      return data;
    }

    /* This method first validates input,
    then pushes the item into the the internal data state */

  }, {
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
        var _ref2, validata, target, id, otherdata;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.validateInput(input);

              case 3:
                _ref2 = _context.sent;
                validata = _ref2.validata;

                if (!(Object.values(validata).length === 0)) {
                  _context.next = 7;
                  break;
                }

                throw new Error('Sorry that was unsucessful');

              case 7:
                // LFA suggestion
                target = void 0;

                target = Object.values(this.data);
                id = target.length > 0 ? target[target.length - 1].id + 1 : 1;
                otherdata = _extends({}, validata, { id: id });

                this.data['' + id] = this._addTimeStamps(otherdata);
                return _context.abrupt('return', this.data['' + id]);

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);
                throw _context.t0;

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      function create(_x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /* This method should check the input frst and throw an
    error if it finds a wrong matched datatype,
    and throws an error, it ignores it if it doesnt find the field  */

  }, {
    key: 'validateInput',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(input) {
        var _this = this;

        var keys, validata;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                keys = Object.keys(this.keys);
                validata = {};
                // mapping through the keys to check the input

                keys.forEach(function (key) {
                  if (input['' + key] === null) {
                    validata['' + key] = null;
                  } else if (input['' + key] && input['' + key].constructor === _this.keys['' + key]) {
                    validata['' + key] = input['' + key];
                  } else if (input['' + key] && (input['' + key].constructor === _this.keys['' + key].constructor || input['' + key].constructor === Number && _this.keys['' + key].constructor === Object)) {
                    validata['' + key] = input['' + key];
                  } else if (input['' + key] && _this.refsMultiple['' + key] && input['' + key].constructor === Array) {
                    validata['' + key] = input['' + key];
                  } else if (input['' + key] && _this.refs['' + key] && input['' + key].constructor === Number) {
                    validata['' + key] = input['' + key];
                  } else if (input['' + key] && input['' + key].constructor !== _this.keys['' + key] && input['' + key] !== null) {
                    throw new TypeError('Wrong datatype for field ' + key);
                  }
                });
                // this is for validating orders;
                if (input.content && this._checkContent) {
                  this._checkContent(input);
                }
                return _context2.abrupt('return', { passing: true, validata: validata });

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function validateInput(_x3) {
        return _ref3.apply(this, arguments);
      }

      return validateInput;
    }()

    /* This method gets the item in the store that matches the query and
      loops through the fields of the item, replacing the specified fields,
      and setting the new item in the object state. Spewing an error if an invalid query is
      passed or the record isnt found on the schema;
    */
    /* eslint prefer-destructuring: 0 */

  }, {
    key: 'findOneAndUpdate',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query, changes) {
        var target, data, _ref5, validata;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                target = void 0;
                data = void 0;

                if (!(this.validateQuery(query) && this.validateInput(changes))) {
                  _context3.next = 14;
                  break;
                }

                // find the target from the query;
                data = Object.values(this.data);
                target = data.filter(function (item) {
                  return item['' + Object.keys(query)[0]] === Object.values(query)[0];
                })[0];

                if (!target) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 8;
                return this.validateInput(changes);

              case 8:
                _ref5 = _context3.sent;
                validata = _ref5.validata;

                Object.keys(validata).forEach(function (key) {
                  target['' + key] = validata['' + key];
                });
                // finally replace the target in this.data;
                this.data['' + target.id] = target;
                return _context3.abrupt('return', target);

              case 13:
                return _context3.abrupt('return', null);

              case 14:
                throw new TypeError('Soumething is either wrong with the input or the new changes');

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findOneAndUpdate(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return findOneAndUpdate;
    }()

    /* This method takes in the query, searches for it in the internal data state for
    an item that matches the query and then forms a new object that doesnt contain the required item and
    sets that new object as the data of the object
      */

  }, {
    key: 'findOneAndDelete',
    value: function findOneAndDelete(query) {
      var target = void 0;
      var data = void 0;
      var filterTray = void 0;
      var newState = {};
      if (this.validateQuery(query)) {
        data = Object.values(this.data);
        target = data.filter(function (item) {
          return item['' + Object.keys(query)[0]] === Object.values(query)[0];
        })[0];
        if (target) {
          filterTray = data.filter(function (item) {
            return item.id !== target.id;
          });
          filterTray.forEach(function (node) {
            newState['' + node.id] = node;
          });
          this.data = newState;
          return true;
        }
        throw new Error('No record found with that query');
      }
      throw new Error('Invalid query passed');
    }

    /* this method will return the given object
    after checking the query and will occassionally populate the given fields if provided
    with the populate argument
    */

  }, {
    key: 'findOne',
    value: function findOne(query, populate) {
      if (this.validateQuery(query)) {
        var data = Object.values(this.data);
        var value = data.filter(function (item) {
          return item['' + Object.keys(query)[0]] === Object.values(query)[0];
        })[0];
        if (value) {
          if (populate && populate === 'populate') {
            return this._populateMain(value);
          }
          return value;
        }
        return null;
      }
      throw new TypeError('Invalid query passed in');
    }

    /* this method should populate both single and multiple fields by checking for the data path and requiring
    the matching refs value in the data folder;
     */
    /* eslint global-require: 0 */
    /* eslint import/no-dynamic-require: 0  */

  }, {
    key: 'getData',
    value: function getData() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data;

      if (Object.keys(this.refs).length > 0 || Object.keys(this.refsMultiple).length > 0) {
        Object.values(data).forEach(function (node) {
          data['' + node.id] = _this2._populateMain(node);
        });
      }
      return data;
    }
  }, {
    key: '_populateMain',
    value: function _populateMain(node) {
      var _this3 = this;

      var Source = void 0;
      Object.keys(this.refs).forEach(function (key) {
        if (node['' + key]) {
          Source = require('./data/' + _this3.refs['' + key].toLowerCase() + '.js').default;
          node['' + key] = Source['' + node['' + key]];
        }
      });

      // secondly multiple relations
      Object.keys(this.refsMultiple).forEach(function (key) {
        if (node['' + key] && node['' + key].constructor === Array) {
          Source = require('./data/' + _this3.refsMultiple['' + key].toLowerCase() + '.js').default;

          /* eslint max-len: 0 */
          /* looping through all the values in the refs field and fetching them from the source file */
          node['' + key].forEach(function (item, index) {
            node['' + key][index] = Source['' + item];
          });
        }
      });

      return node;
    }
  }]);

  return DataHandler;
}();

exports.default = DataHandler;