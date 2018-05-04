import dotenv from 'dotenv';
import configjson from '../config/config.json'
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

/* eslint no-console: 0 */
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
dotenv.config();
const config = configjson[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, process.env[config.password], config);
}


sequelize
  .authenticate()
  .then(() => {
    console.log('connected to the postgres server')
  })
  .catch((err) => { console.log(err); })
  .done();


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
