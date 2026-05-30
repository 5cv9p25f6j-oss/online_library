'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bookGenreMapping = {
      'Հոբիտը': 'Fantasy',
      'Անդրոմեդա՝ Տարածման‑Զարթված Բանարարություն': 'Science Fiction',
      'Նարուկ և Տարգումը': 'Classic',
      'Անձավեր Գենե': 'Science',
      'Մուռգի փողոցում Խորտիկներ': 'Gothic',
      'Բաժեղի Սև': 'Fantasy',
      'Ոչ Երկիր Հին Անձրեւի Բանարություն': 'Literary Fiction',
      'Զարդ': 'Fiction',
      'Պաստակները: Գրքի առաջին հատոր': 'Fantasy',
      'Պաստակները: Գրքի մեկերորդ հատոր': 'Fantasy',
      'Bull’s Hour': 'Science Fiction',
      'Thais of Athens': 'Science Fiction',
      'The Brothers Karamazov': 'Classic',
      'The Idiot': 'Classic',
      'Blood Meridian': 'Literary Fiction',
      'The Road': 'Literary Fiction',
      'Blood of Elves': 'Fantasy',
      'Time of Contempt': 'Fantasy',
      'The Tell‑Tale Heart': 'Gothic',
      'The Fall of the House of Usher': 'Gothic',
      'Beyond the Sea': 'Drama',
      'The Black Snow': 'Drama',
      'The God Delusion': 'Science',
      'The Extended Phenotype': 'Science',
      'Foundation': 'Science Fiction',
      'Foundation and Empire': 'Science Fiction',
      'Second Foundation': 'Science Fiction',
      'I, Robot': 'Science Fiction',
      'It': 'Horror',
      'The Shining': 'Horror',
      'Carrie': 'Horror',
      'Pride and Prejudice': 'Romance',
      'Sense and Sensibility': 'Romance',
      'Murder on the Orient Express': 'Mystery',
      'And Then There Were None': 'Mystery',
      'Steve Jobs': 'Biography',
      'Einstein: His Life and Universe': 'Biography',
      'Hondo': 'Western',
      'Sackett’s Land': 'Western',
      'The Notebook': 'Romance',
      'A Walk to Remember': 'Romance',
      'Wuthering Heights': 'Gothic',
      'Gone Girl': 'Thriller',
      'Sharp Objects': 'Thriller',
      'The Da Vinci Code': 'Thriller',
      'Inferno': 'Thriller',
      'The Power Broker': 'Biography',
      'Means of Ascent': 'Biography',
      'Hamilton': 'History',
      'Washington: A Life': 'Biography'
    };

    for (const [bookTitle, genre] of Object.entries(bookGenreMapping)) {
      try {
        await queryInterface.sequelize.query(`
          UPDATE "online_library"."Books"
          SET "genre" = :genre, "updatedAt" = NOW()
          WHERE LOWER("title") = LOWER(:bookTitle)
          AND ("genre" IS NULL OR "genre" = '')
        `, {
          replacements: { genre, bookTitle },
          type: Sequelize.QueryTypes.UPDATE
        });
      } catch (error) {
        console.warn(`Failed to update genre for book "${bookTitle}":`, error.message);
      }
    }

    // Fallback: update any remaining books' genres based on their authors
    try {
      await queryInterface.sequelize.query(`
        UPDATE "online_library"."Books"
        SET "genre" = "Authors"."genre", "updatedAt" = NOW()
        FROM "online_library"."Authors" AS "Authors"
        WHERE LOWER("online_library"."Books"."authorName") = LOWER("Authors"."name")
        AND ("online_library"."Books"."genre" IS NULL OR "online_library"."Books"."genre" = '')
        AND "Authors"."genre" IS NOT NULL AND "Authors"."genre" != ''
      `);
    } catch (error) {
      console.warn('Failed fallback books update from authors:', error.message);
    }
  },

  async down (queryInterface, Sequelize) {
    // No-op
  }
};
