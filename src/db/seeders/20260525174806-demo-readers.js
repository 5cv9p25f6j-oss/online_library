'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const readers = [
      { name: 'Արմեն Պետրոսյան', email: 'armen@example.com', joinedDate: new Date('2023-01-15'), active: true },
      { name: 'Աննա Հովհաննիսյան', email: 'anna@example.com', joinedDate: new Date('2023-03-22'), active: true },
      { name: 'Տիգրան Խաչատրյան', email: 'tigran@example.com', joinedDate: new Date('2022-11-05'), active: false },
      { name: 'Մարիամ Գրիգորյան', email: 'mariam@example.com', joinedDate: new Date('2023-05-10'), active: true },
      { name: 'Գոռ Սարգսյան', email: 'gor@example.com', joinedDate: new Date('2021-08-19'), active: true },
      { name: 'Հասմիկ Վարդանյան', email: 'hasmik@example.com', joinedDate: new Date('2023-02-14'), active: true },
      { name: 'Արամ Գասպարյան', email: 'aram@example.com', joinedDate: new Date('2020-12-01'), active: false },
      { name: 'Լուսինե Մարտիրոսյան', email: 'lusine@example.com', joinedDate: new Date('2023-06-30'), active: true },
      { name: 'Դավիթ Ստեփանյան', email: 'davit@example.com', joinedDate: new Date('2022-09-25'), active: true },
      { name: 'Էլեն Հակոբյան', email: 'elen@example.com', joinedDate: new Date('2023-01-05'), active: true },
      { name: 'Վահե Կարապետյան', email: 'vahe@example.com', joinedDate: new Date('2021-04-12'), active: false },
      { name: 'Անի Աբրահամյան', email: 'ani@example.com', joinedDate: new Date('2023-07-11'), active: true },
      { name: 'Աշոտ Ներսիսյան', email: 'ashot@example.com', joinedDate: new Date('2020-03-08'), active: true },
      { name: 'Շուշան Թորոսյան', email: 'shushan@example.com', joinedDate: new Date('2022-05-17'), active: true },
      { name: 'Գևորգ Միքայելյան', email: 'gevorg@example.com', joinedDate: new Date('2021-11-20'), active: false },
      { name: 'Լիլիթ Սիմոնյան', email: 'lilit@example.com', joinedDate: new Date('2023-04-03'), active: true },
      { name: 'Արթուր Հարությունյան', email: 'artur@example.com', joinedDate: new Date('2022-08-14'), active: true },
      { name: 'Սյուզաննա Մանուկյան', email: 'syuzanna@example.com', joinedDate: new Date('2021-02-28'), active: false },
      { name: 'Հայկ Բաբայան', email: 'hayk@example.com', joinedDate: new Date('2023-08-01'), active: true },
      { name: 'Նարե Ղազարյան', email: 'nare@example.com', joinedDate: new Date('2022-10-10'), active: true },
      { name: 'Ռուբեն Պողոսյան', email: 'ruben@example.com', joinedDate: new Date('2020-07-07'), active: false },
      { name: 'Սոնա Արշակյան', email: 'sona@example.com', joinedDate: new Date('2023-09-12'), active: true },
      { name: 'Կարեն Օհանյան', email: 'karen@example.com', joinedDate: new Date('2021-06-25'), active: true },
      { name: 'Անահիտ Եղիազարյան', email: 'anahit@example.com', joinedDate: new Date('2022-01-22'), active: true },
      { name: 'Միքայել Անտոնյան', email: 'mikayel@example.com', joinedDate: new Date('2023-05-19'), active: false }
    ].map(reader => ({
      ...reader,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Readers', readers, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Readers', null, {});
  }
};
