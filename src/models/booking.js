'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Each booking belongs to a user (foreign key relationship)
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // Each booking belongs to a train (foreign key relationship)
      Booking.belongsTo(models.Train, { foreignKey: 'trainId', as: 'train' });
    }
  }

  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Ensure 'userId' is required
      references: {
        model: 'Users',  // Reference to 'Users' table
        key: 'id',
      },
      onDelete: 'CASCADE', // Delete bookings if the user is deleted
    },
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Ensure 'trainId' is required
      references: {
        model: 'Trains',  // Reference to 'Trains' table
        key: 'id',
      },
      onDelete: 'CASCADE', // Delete bookings if the train is deleted
    },
    seats_booked: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Ensure 'seats_booked' is required
      validate: {
        min: 1,  // Ensure at least 1 seat is booked
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure 'status' is required
      defaultValue: 'pending',  // Default status is 'pending'
      validate: {
        isIn: [['pending', 'confirmed', 'cancelled']],  // Valid statuses
      },
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
