'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trains', 'adminId', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'IRCTC',  // Default to IRCTC for now
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trains', 'adminId');
  }
};
