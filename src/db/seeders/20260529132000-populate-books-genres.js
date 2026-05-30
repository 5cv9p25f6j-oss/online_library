'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.sequelize.query(`
        UPDATE "online_library"."Books"
        SET "genre" = "Authors"."genre", "updatedAt" = NOW()
        FROM "online_library"."Authors" AS "Authors"
        WHERE LOWER("online_library"."Books"."authorName") = LOWER("Authors"."name")
        AND "Authors"."genre" IS NOT NULL AND "Authors"."genre" != ''
      `);
      console.log('Successfully updated book genres based on their authors.');
    } catch (error) {
      console.error('Failed to update book genres from authors:', error.message);
    }
  },

  async down (queryInterface, Sequelize) {
    // Updates are not easily reversible in a generic way, so we do nothing here
  }
};
