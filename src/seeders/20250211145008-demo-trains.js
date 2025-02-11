'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Trains', [
      {
        train_name: 'Rajdhani Express',
        source: 'Howrah',      // Popular source station
        destination: 'Mumbai', // Popular destination station
        total_seats: 100,
        available_seats: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        train_name: 'Shatabdi Express',
        source: 'New Delhi',
        destination: 'Chandigarh',
        total_seats: 80,
        available_seats: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        train_name: 'Duronto Express',
        source: 'Kolkata',     // Source: Kolkata
        destination: 'Bangalore',
        total_seats: 120,
        available_seats: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        train_name: 'Maharaja Express',
        source: 'Delhi',
        destination: 'Agra',
        total_seats: 50,
        available_seats: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        train_name: 'Nandigram Express',
        source: 'Mumbai',
        destination: 'Pune',
        total_seats: 150,
        available_seats: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        train_name: 'Korba Express',
        source: 'Korba',
        destination: 'Raipur',
        total_seats: 200,
        available_seats: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Trains', null, {});
  }
};
