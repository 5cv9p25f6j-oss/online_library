'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Update known authors' genres directly
    const authorGenreMapping = {
      'Րաֆֆի': 'Poetry',
      'Մուրացան': 'Prose',
      'Շիրվանզադե': 'Drama',
      'Հովհաննես Թումանյան': 'Poetry',
      'Ավետիք Իսահակյան': 'Poetry',
      'Եղիշե Չարենց': 'Poetry',
      'Վահան Տերյան': 'Poetry',
      'Պարույր Սևակ': 'Poetry',
      'Համո Սահյան': 'Poetry',
      'Դերենիկ Դեմիրճյան': 'Literature',
      'Նար-Դոս': 'Literature',
      'Գրիգոր Զոհրապ': 'Literature',
      'Դանիել Վարուժան': 'Poetry',
      'Սիամանթո': 'Poetry',
      'Ռուբեն Սևակ': 'Poetry',
      'Ուիլյամ Սարոյան': 'Literature',
      'J.R.R. Tolkien': 'Fantasy',
      'Ivan': 'Science Fiction',
      'Ivan Efremov': 'Science Fiction',
      'Fyodor Dostoevsky': 'Classic',
      'Richard Dawkins': 'Science',
      'Edgar Allan Poe': 'Gothic',
      'Andrzej Sapkowski': 'Fantasy',
      'Cormac McCarthy': 'Literary Fiction',
      'John Doe': 'Fiction',
      'John Lynch': 'Drama',
      'Isaac Asimov': 'Science Fiction',
      'Stephen King': 'Horror',
      'Jane Austen': 'Romance',
      'Agatha Christie': 'Mystery',
      'Walter Isaacson': 'Biography',
      'John L. Lamour': 'Western',
      'Nicholas Sparks': 'Romance',
      'Emily Brontë': 'Gothic',
      'Gillian Flynn': 'Thriller',
      'Dan Brown': 'Thriller',
      'Robert Caro': 'Biography',
      'Sebastian Junger': 'History',
      'Ron Chernow': 'Biography'
    };

    for (const [authorName, genre] of Object.entries(authorGenreMapping)) {
      try {
        await queryInterface.sequelize.query(`
          UPDATE "online_library"."Authors"
          SET "genre" = :genre, "updatedAt" = NOW()
          WHERE LOWER("name") = LOWER(:authorName)
          AND ("genre" IS NULL OR "genre" = '')
        `, {
          replacements: { genre, authorName },
          type: Sequelize.QueryTypes.UPDATE
        });
      } catch (error) {
        console.warn(`Failed to update genre for author ${authorName}:`, error.message);
      }
    }

    // 2. Fallback: Update any other authors' genres from the books they wrote
    try {
      await queryInterface.sequelize.query(`
        UPDATE "online_library"."Authors"
        SET "genre" = "Books"."genre", "updatedAt" = NOW()
        FROM "online_library"."Books" AS "Books"
        WHERE LOWER("online_library"."Authors"."name") = LOWER("Books"."authorName")
        AND ("online_library"."Authors"."genre" IS NULL OR "online_library"."Authors"."genre" = '')
        AND "Books"."genre" IS NOT NULL AND "Books"."genre" != ''
      `);
    } catch (error) {
      console.warn('Failed to run fallback authors genre update from Books:', error.message);
    }
  },

  async down (queryInterface, Sequelize) {
    // Updates are not easily reversible in a generic way, so we do nothing here
  }
};
