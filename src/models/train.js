'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Train extends Model {
    static associate(models) {
      Train.hasMany(models.Booking, { foreignKey: 'trainId', as: 'bookings' });
    }
  }

  Train.init({
    train_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    train_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'express',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      },
      defaultValue: 500, 
    },
    adminId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'IRCTC', 
    }
  }, {
    sequelize,
    modelName: 'Train',
  });

  return Train;
};
