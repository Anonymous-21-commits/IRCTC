'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Each booking belongs to one user
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // Each booking belongs to one train
      Booking.belongsTo(models.Train, { foreignKey: 'trainId', as: 'train' });
    }
  }

  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // User must be assigned for each booking
    },
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Train must be assigned for each booking
    },
    seats_booked: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Seats booked must be provided
      validate: {
        min: 1  // A booking must include at least one seat
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',  // Default status is 'pending'
      validate: {
        isIn: [['pending', 'confirmed', 'cancelled']]  // Valid statuses
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
