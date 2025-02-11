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
        allowNull: false, 
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,  
        validate: {
          min: 1 
        }
      },
      available_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,  
        validate: {
          min: 0  
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false, 
        defaultValue: 'active',  
      },
      train_type: {
        type: Sequelize.STRING,
        allowNull: false,  
        defaultValue: 'express',  
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
