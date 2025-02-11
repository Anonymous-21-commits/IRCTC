'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
     
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

     
      Booking.belongsTo(models.Train, { foreignKey: 'trainId', as: 'train' });
    }
  }

  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'Users',  
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
    trainId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'Trains',  
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
    seats_booked: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      validate: {
        min: 1, 
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,  
      defaultValue: 'pending',  
      validate: {
        isIn: [['pending', 'confirmed', 'cancelled']],  
      },
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
