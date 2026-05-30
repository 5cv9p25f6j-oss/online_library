'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const authors = [

      // Armenian authors
      { name: 'Րաֆֆի', country: 'Armenia', genre: 'Poetry' },
      { name: 'Մուրացան', country: 'Armenia', genre: 'Prose' },
      { name: 'Շիրվանզադե', country: 'Armenia', genre: 'Drama' },
      { name: 'Հովհաննես Թումանյան', country: 'Armenia', genre: 'Poetry' },
      { name: 'Ավետիք Իսահակյան', country: 'Armenia', genre: 'Poetry' },
      { name: 'Եղիշե Չարենց', country: 'Armenia', genre: 'Poetry' },
      { name: 'Վահան Տերյան', country: 'Armenia', genre: 'Poetry' },
      { name: 'Պարույր Սևակ', country: 'Armenia', genre: 'Poetry' },
      { name: 'Համո Սահյան', country: 'Armenia', genre: 'Poetry' },
      { name: 'Դերենիկ Դեմիրճյան', country: 'Armenia', genre: 'Literature' },
      { name: 'Նար-Դոս', country: 'Armenia', genre: 'Literature' },
      { name: 'Գրիգոր Զոհրապ', country: 'Armenia', genre: 'Literature' },
      { name: 'Դանիել Վարուժան', country: 'Armenia', genre: 'Poetry' },
      { name: 'Սիամանթո', country: 'Armenia', genre: 'Poetry' },
      { name: 'Ռուբեն Սևակ', country: 'Armenia', genre: 'Poetry' },
      { name: 'Ուիլյամ Սարոյան', country: 'USA', genre: 'Literature' },
      // International authors referenced in books
      { name: 'J.R.R. Tolkien', country: 'United Kingdom', genre: 'Fantasy' },
      { name: 'Ivan', country: 'Russia', genre: 'Science Fiction' },
      { name: 'Ivan Efremov', country: 'Russia', genre: 'Science Fiction' },
      { name: 'Fyodor Dostoevsky', country: 'Russia', genre: 'Classic' },
      { name: 'Richard Dawkins', country: 'United Kingdom', genre: 'Science' },
      { name: 'Edgar Allan Poe', country: 'USA', genre: 'Gothic' },
      { name: 'Andrzej Sapkowski', country: 'Poland', genre: 'Fantasy' },
      { name: 'Cormac McCarthy', country: 'USA', genre: 'Literary Fiction' },
      { name: 'John Doe', country: 'USA', genre: 'Fiction' },
      { name: 'John Lynch', country: 'USA', genre: 'Drama' },
      { name: 'Isaac Asimov', country: 'USA', genre: 'Science Fiction' },
      { name: 'Stephen King', country: 'USA', genre: 'Horror' },
      { name: 'Jane Austen', country: 'United Kingdom', genre: 'Romance' },
      { name: 'Agatha Christie', country: 'United Kingdom', genre: 'Mystery' },
      { name: 'Walter Isaacson', country: 'USA', genre: 'Biography' },
      { name: 'John L. Lamour', country: 'USA', genre: 'Western' },
      { name: 'Nicholas Sparks', country: 'USA', genre: 'Romance' },
      { name: 'Emily Brontë', country: 'United Kingdom', genre: 'Gothic' },
      { name: 'Gillian Flynn', country: 'USA', genre: 'Thriller' },
      { name: 'Dan Brown', country: 'USA', genre: 'Thriller' },
      { name: 'Robert Caro', country: 'USA', genre: 'Biography' },
      { name: 'Sebastian Junger', country: 'USA', genre: 'History' },
      { name: 'Ron Chernow', country: 'USA', genre: 'Biography' }
    ].map(author => ({ ...author, createdAt: new Date(), updatedAt: new Date() }));
    await queryInterface.bulkInsert({ tableName: 'Authors', schema: 'online_library' }, authors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'Authors', schema: 'online_library' }, null, {});
  }
};
