'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../../config/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-console: 0 */
var env = process.env.NODE_ENV || 'development';
var db = {};
_dotenv2.default.config();
var config = _config2.default[env];
var sequelize = void 0;
if (config.use_env_variable) {
  sequelize = new _sequelize2.default(config.use_env_variable);
} else {
  sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(function () {
  console.log('connected to the postgres server');
}).catch(function (err) {
  console.log(err);
}).done();

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;
module.exports = db;