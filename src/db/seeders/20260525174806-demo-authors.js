'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const authors = [
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'Authors', schema: 'online_library' }, null, {});
  }
};
