'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const genres = [
      { name: 'Poetry' },
      { name: 'Prose' },
      { name: 'Drama' },
      { name: 'Literature' },
      { name: 'Fantasy' },
      { name: 'Science Fiction' },
      { name: 'Classic' },
      { name: 'Science' },
      { name: 'Gothic' },
      { name: 'Literary Fiction' },
      { name: 'Fiction' },
      { name: 'Horror' },
      { name: 'Romance' },
      { name: 'Mystery' },
      { name: 'Biography' },
      { name: 'Western' },
      { name: 'Thriller' },
      { name: 'History' }
    ].map(genre => ({
      ...genre,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    try {
      await queryInterface.bulkInsert({ tableName: 'Genres', schema: 'online_library' }, genres, {});
    } catch (error) {
      console.warn('Skipping Genres seed: table does not exist.');
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete({ tableName: 'Genres', schema: 'online_library' }, null, {});
    } catch (error) {
      console.warn('Skipping Genres seed undo: table does not exist.');
    }
  }
};
