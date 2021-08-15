'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pseudo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Nouveau utilisateur'
      },
      job: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Poste de travail',
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: false, 
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};