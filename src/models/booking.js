'use strict';
const { Model } = require('sequelize');
const { BOOKING_STATUS } = require('../utils/common');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Booking.belongsTo(models.Train, { foreignKey: 'trainId', as: 'train' });
    }
  }

  Booking.init({
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Trains',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(BOOKING_STATUS),
      defaultValue: BOOKING_STATUS.INITIATED,
      allowNull: false,
    },
    noofSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
