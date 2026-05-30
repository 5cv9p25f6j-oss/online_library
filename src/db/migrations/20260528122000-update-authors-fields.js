'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Удаляем старые колонки
    await queryInterface.removeColumn({ tableName: 'Authors', schema: 'online_library' }, 'birthYear');
    await queryInterface.removeColumn({ tableName: 'Authors', schema: 'online_library' }, 'biography');
    
    // Добавляем новые колонки
    await queryInterface.addColumn({ tableName: 'Authors', schema: 'online_library' }, 'country', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn({ tableName: 'Authors', schema: 'online_library' }, 'genre', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Восстанавливаем старые колонки
    await queryInterface.addColumn({ tableName: 'Authors', schema: 'online_library' }, 'birthYear', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn({ tableName: 'Authors', schema: 'online_library' }, 'biography', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    // Удаляем новые колонки
    await queryInterface.removeColumn({ tableName: 'Authors', schema: 'online_library' }, 'country');
    await queryInterface.removeColumn({ tableName: 'Authors', schema: 'online_library' }, 'genre');
  }
};
