'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      train_name: {
        type: Sequelize.STRING,
        allowNull: false,  // Make train_name required
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,  // Make source required
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,  // Make destination required
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Make total_seats required
        validate: {
          min: 1  // Ensure total_seats is at least 1
        }
      },
      available_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Make available_seats required
        validate: {
          min: 0  // Ensure available_seats can't be negative
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,  // Make status required
        defaultValue: 'active',  // Default value
      },
      train_type: {
        type: Sequelize.STRING,
        allowNull: false,  // Make train_type required
        defaultValue: 'express',  // Default value
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
    await queryInterface.dropTable('Trains');
  }
};
