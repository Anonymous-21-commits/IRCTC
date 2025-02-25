'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'username');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    });
  },
};
