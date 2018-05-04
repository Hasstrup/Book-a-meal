import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const User = sequelize.define('User', {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false
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
  avatar: DataTypes.STRING,
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  }
}, {});

export default User
