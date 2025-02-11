'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Each user can have many bookings
      User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookings' });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,  // Makes 'username' required
      unique: true       // Ensures that the username is unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  // Makes 'email' required
      unique: true,      // Ensures that the email is unique
      validate: {
        isEmail: true     // Validates if the email is in the correct format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false   // Makes 'password' required
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,  // Makes 'role' required
      defaultValue: 'user', // Default role is 'user'
      validate: {
        isIn: [['user', 'admin']] // Ensures the role is either 'user' or 'admin'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
