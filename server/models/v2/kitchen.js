import { DataTypes } from 'sequelize'
import { sequelize } from './';

const Kitchen = sequelize.define('Kitchen', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString(value) {
        if (value.constructor !== String) {
          throw new Error('name must be string');
        }
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false
  }
})

export default Kitchen;
