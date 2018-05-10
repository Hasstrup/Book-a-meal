import { DataTypes } from 'sequelize';
import { sequelize } from './index';
import Encrypt from '../../helpers/encrypt';

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
    type: DataTypes.STRING,
    defaultValue: "https://pixabay.com/en/avatar-icon-placeholder-1577909/"
  },

  confirmedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  resetPasswordCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  }
}, {
  hooks: {
    beforeCreate: (instance) => {
      return instance.password =  Encrypt.hashPassword(instance.password);
    }
  }
});

export default User
