'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,   // Make 'username' required
        unique: true,       // Make 'username' unique
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,   // Make 'email' required
        unique: true,       // Make 'email' unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,   // Make 'password' required
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,   // Make 'role' required
        defaultValue: 'user', // Default value is 'user'
        validate: {
          isIn: [['user', 'admin']] // Ensure the role is either 'user' or 'admin'
        }
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
    await queryInterface.dropTable('Users');
  }
};
