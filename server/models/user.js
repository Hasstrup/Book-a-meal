import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const isString = (value) => {
  if (value.constructor !== String) {
    throw new Error('Invalid type for string');
  }
};

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    validate: {
      isString
    }
  },

  lastname: {
    type: DataTypes.STRING,
    validate: {
      isString
    }
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isString,
      isEmail: true,
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  avatar: {
    type: DataTypes.STRING
  },

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  }
}, {});

export default User;
