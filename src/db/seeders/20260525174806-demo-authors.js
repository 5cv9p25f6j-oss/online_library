'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const authors = [
<<<<<<< Updated upstream
      { name: 'Րաֆֆի', birthYear: 1835, biography: 'Հայ նշանավոր գրող, հրապարակախոս, և հասարակական գործիչ։' },
      { name: 'Մուրացան', birthYear: 1854, biography: 'Հայ դասական գրող, վիպասան։' },
      { name: 'Շիրվանզադե', birthYear: 1858, biography: 'Հայ ականավոր արձակագիր և դրամատուրգ։' },
      { name: 'Հովհաննես Թումանյան', birthYear: 1869, biography: 'Ամենայն հայոց բանաստեղծ, արձակագիր, գրական-հասարակական գործիչ։' },
      { name: 'Ավետիք Իսահակյան', birthYear: 1875, biography: 'Հայ մեծանուն բանաստեղծ, արձակագիր, Վարպետ։' },
      { name: 'Եղիշե Չարենց', birthYear: 1897, biography: 'Հանճարեղ հայ բանաստեղծ, արձակագիր, թարգմանիչ։' },
      { name: 'Վահան Տերյան', birthYear: 1885, biography: 'Հայ նշանավոր բանաստեղծ, քնարերգու։' },
      { name: 'Պարույր Սևակ', birthYear: 1924, biography: 'Հայ ականավոր բանաստեղծ, մշակութային գործիչ, գրականագետ։' },
      { name: 'Համո Սահյան', birthYear: 1914, biography: 'Հայ անվանի բանաստեղծ։' },
      { name: 'Դերենիկ Դեմիրճյան', birthYear: 1877, biography: 'Հայ արձակագիր, բանաստեղծ, դրամատուրգ։' },
      { name: 'Նար-Դոս', birthYear: 1867, biography: 'Հայ գրող, արձակագիր։' },
      { name: 'Գրիգոր Զոհրապ', birthYear: 1861, biography: 'Արևմտահայ գրող, հասարակական-քաղաքական գործիչ։' },
      { name: 'Դանիել Վարուժան', birthYear: 1884, biography: 'Արևմտահայ բանաստեղծ։' },
      { name: 'Սիամանթո', birthYear: 1878, biography: 'Հայ բանաստեղծ, ազգային ողբերգության երգիչ։' },
      { name: 'Ռուբեն Սևակ', birthYear: 1885, biography: 'Հայ բանաստեղծ, բժիշկ։' },
      { name: 'Ուիլյամ Սարոյան', birthYear: 1908, biography: 'Ամերիկահայ նշանավոր գրող։' },
      { name:  'Վիլյամ Շեքսպիր', birthYear: 1564, biography: 'Անգլիացի մեծագույն դրամատուրգ և բանաստեղծ։' },
      { name: 'Լև Տոլստոյ', birthYear: 1828, biography: 'Ռուս մեծանուն գրող, խոհագետ։' },
      { name: 'Ֆեոդոր Դոստոևսկի', birthYear: 1821, biography: 'Ռուս մեծանուն արձակագիր և փիլիսոփա։' },
      { name: 'Ջորջ Օրուել', birthYear: 1903, biography: 'Անգլիացի գրող, լրագրող։' },
      { name: 'Անտուան դը Սենտ-Էքզյուպերի', birthYear: 1900, biography: 'Ֆրանսիացի գրող, բանաստեղծ, օդաչու։' },
      { name: 'Էռնեստ Հեմինգուեյ', birthYear: 1899, biography: 'Ամերիկացի գրող, Նոբելյան մրցանակակիր։' },
      { name: 'Գաբրիել Գարսիա Մարկես', birthYear: 1927, biography: 'Կոլումբիացի գրող, մոգական ռեալիզմի վարպետ։' },
      { name: 'Խորխե Լուիս Բորխես', birthYear: 1899, biography: 'Արգենտինացի մեծ գրող և մտածող։' },
      { name: 'Ալեքսանդր Դյումա', birthYear: 1802, biography: 'Ֆրանսիացի գրող, արկածային վեպերի հեղինակ։' }
    ].map(author => ({
      ...author,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert({ tableName: 'Authors', schema: 'online_library' }, authors, {});
=======
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
    await queryInterface.bulkInsert('Authors', authors, {});
>>>>>>> Stashed changes
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'Authors', schema: 'online_library' }, null, {});
  }
};
