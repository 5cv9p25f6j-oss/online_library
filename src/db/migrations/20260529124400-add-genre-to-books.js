'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add the genre column to the Books table
    await queryInterface.addColumn('Books', 'genre', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // 2. Populate the genre of Books from the corresponding Author's genre
    await queryInterface.sequelize.query(`
      UPDATE "Books"
      SET "genre" = "Authors"."genre"
      FROM "Authors"
      WHERE LOWER("Books"."authorName") = LOWER("Authors"."name")
    `);
  },

  async down(queryInterface, Sequelize) {
    // Remove the genre column from Books
    await queryInterface.removeColumn('Books', 'genre');
  }
};
