'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    static associate(models) {
      // Each train can have many bookings
      Train.hasMany(models.Booking, { foreignKey: 'trainId', as: 'bookings' });
    }
  }

  Train.init({
    train_name: {
      type: DataTypes.STRING,
      allowNull: false,  // Makes 'train_name' required
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,  // Makes 'source' required
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,  // Makes 'destination' required
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Makes 'total_seats' required
      validate: {
        min: 1  // Ensures the total_seats is at least 1
      }
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Makes 'available_seats' required
      validate: {
        min: 0  // Ensures available_seats can't be negative
      }
    }
  }, {
    sequelize,
    modelName: 'Train',
  });

  return Train;
};
