'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Ensure 'userId' is required
        references: {
          model: 'Users',  // Reference to 'Users' table
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete bookings if the user is deleted
      },
      trainId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Ensure 'trainId' is required
        references: {
          model: 'Trains',  // Reference to 'Trains' table
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete bookings if the train is deleted
      },
      seats_booked: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Ensure 'seats_booked' is required
        validate: {
          min: 1,  // Ensure at least 1 seat is booked
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,  // Ensure 'status' is required
        defaultValue: 'pending',  // Default value is 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
