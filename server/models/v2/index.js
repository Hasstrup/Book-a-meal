import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import configjson from '../../config/config.json';


/* eslint no-console: 0 */
const env = process.env.NODE_ENV || 'development';
const db = {};
dotenv.config();
const config = configjson[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
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
