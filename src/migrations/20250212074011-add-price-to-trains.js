'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trains', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1000, // Default value, adjust as needed
      validate: {
        min: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trains', 'price');
  }
};
