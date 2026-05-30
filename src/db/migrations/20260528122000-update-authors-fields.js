'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Удаляем старые колонки
    await queryInterface.removeColumn('Authors', 'birthYear');
    await queryInterface.removeColumn('Authors', 'biography');
    
    // Добавляем новые колонки
    await queryInterface.addColumn('Authors', 'country', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Authors', 'genre', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Восстанавливаем старые колонки
    await queryInterface.addColumn('Authors', 'birthYear', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('Authors', 'biography', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    // Удаляем новые колонки
    await queryInterface.removeColumn('Authors', 'country');
    await queryInterface.removeColumn('Authors', 'genre');
  }
};
