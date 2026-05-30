'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add the genre column to the Books table
    await queryInterface.addColumn({ tableName: 'Books', schema: 'online_library' }, 'genre', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // 2. Populate the genre of Books from the corresponding Author's genre
    await queryInterface.sequelize.query(`
      UPDATE "online_library"."Books"
      SET "genre" = "Authors"."genre"
      FROM "online_library"."Authors" AS "Authors"
      WHERE LOWER("online_library"."Books"."authorName") = LOWER("Authors"."name")
    `);
  },

  async down(queryInterface, Sequelize) {
    // Remove the genre column from Books
    await queryInterface.removeColumn({ tableName: 'Books', schema: 'online_library' }, 'genre');
  }
};
