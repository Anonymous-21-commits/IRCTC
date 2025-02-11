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
        allowNull: false, 
        references: {
          model: 'Users', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      trainId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Trains', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      seats_booked: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        validate: {
          min: 1,  
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,  
        defaultValue: 'pending', 
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
