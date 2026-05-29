'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const books = [
      { title: 'Սամվել', authorName: 'Րաֆֆի', year: 1886, description: 'Պատմական վեպ 4-րդ դարի Հայաստանի մասին։' },
      { title: 'Գևորգ Մարզպետունի', authorName: 'Մուրացան', year: 1896, description: 'Պատմական վեպ 10-րդ դարի Հայաստանի մասին։' },
      { title: 'Քաոս', authorName: 'Շիրվանզադե', year: 1898, description: 'Սոցիալ-հոգեբանական վեպ բուրժուական հասարակության մասին։' },
      { title: 'Խենթը', authorName: 'Րաֆֆի', year: 1881, description: 'Պատմական վեպ հայ-ռուս-թուրքական պատերազմի ժամանակաշրջանի մասին։' },
      { title: 'Վարդանանք', authorName: 'Դերենիկ Դեմիրճյան', year: 1943, description: 'Պատմավեպ 5-րդ դարի Վարդանանց պատերազմի մասին։' },
      { title: 'Անլռելի զանգակատուն', authorName: 'Պարույր Սևակ', year: 1959, description: 'Պոեմ Կոմիտասի կյանքի և գործունեության մասին։' },
      { title: 'Հին աստվածներ', authorName: 'Լևոն Շանթ', year: 1912, description: 'Դրամա հոգևորականության և աշխարհիկ կյանքի բախման մասին։' },
      { title: 'Գրքերի պահապանը', authorName: 'Խորխե Լուիս Բորխես', year: 1970, description: 'Համաշխարհային գրականության գոհարներից, թարգմանված հայերեն։' },
      { title: 'Ծերունին և ծովը', authorName: 'Էռնեստ Հեմինգուեյ', year: 1952, description: 'Նոբելյան մրցանակի արժանացած հայտնի վիպակ։' },
      { title: 'Աննա Կարենինա', authorName: 'Լև Տոլստոյ', year: 1877, description: 'Դասական վեպ սիրո և հասարակության բարքերի մասին։' },
      { title: '1984', authorName: 'Ջորջ Օրուել', year: 1949, description: 'Հայտնի հակաուտոպիական վեպ տոտալիտարիզմի մասին։' },
      { title: 'Փոքրիկ Իշխանը', authorName: 'Անտուան դը Սենտ-Էքզյուպերի', year: 1943, description: 'Հեքիաթ-վիպակ մարդկային հարաբերությունների մասին։' },
      { title: 'Հարրի Փոթերը և Փիլիսոփայական քարը', authorName: 'Ջ.Ք. Ռոուլինգ', year: 1997, description: 'Ֆենտեզի ժանրի ամենահայտնի գրքերից մեկը։' },
      { title: 'Ալքիմիկոսը', authorName: 'Պաուլո Կոելիո', year: 1988, description: 'Վեպ մարդու երազանքների և սեփական ճակատագրի որոնման մասին։' },
      { title: 'Մարտին Իդեն', authorName: 'Ջեկ Լոնդոն', year: 1909, description: 'Ինքնակենսագրական վեպ գրողի դառնալու ճանապարհի մասին։' },
      { title: 'Կոմս Մոնտե Քրիստո', authorName: 'Ալեքսանդր Դյումա', year: 1844, description: 'Արկածային վեպ վրեժի և արդարության մասին։' },
      { title: 'Ոճիր և պատիժ', authorName: 'Ֆեոդոր Դոստոևսկի', year: 1866, description: 'Հոգեբանական վեպ մարդկային խղճի և պատժի մասին։' },
      { title: 'Մոբի Դիք', authorName: 'Հերման Մելվիլ', year: 1851, description: 'Վեպ հսկա սպիտակ կետի և մարդու պայքարի մասին։' },
      { title: 'Հպարտություն և նախապաշարմունք', authorName: 'Ջեյն Օսթին', year: 1813, description: 'Դասական վեպ սիրո և հասարակական դասակարգերի մասին։' },
      { title: 'Գուլիվերի ճանապարհորդությունները', authorName: 'Ջոնաթան Սվիֆթ', year: 1726, description: 'Երգիծական վեպ մարդկային թերությունների մասին։' },
      { title: 'Մարքեզի Հարյուր տարվա մենությունը', authorName: 'Գաբրիել Գարսիա Մարկես', year: 1967, description: 'Մոգական ռեալիզմի լավագույն նմուշներից մեկը։' },
      { title: 'Ֆարենհայթ 451', authorName: 'Ռեյ Բրեդբերի', year: 1953, description: 'Գրքերի այրման և գրաքննության մասին հակաուտոպիա։' },
      { title: 'Դոն Կիխոտ', authorName: 'Միգել դե Սերվանտես', year: 1605, description: 'Աշխարհի առաջին ժամանակակից վեպերից մեկը։' },
      { title: 'Ալիսը Հրաշքների աշխարհում', authorName: 'Լուիս Քերոլ', year: 1865, description: 'Ֆենտեզի հեքիաթ մեծերի և փոքրերի համար։' },
      { title: 'Սասնա Ծռեր', authorName: 'Ժողովրդական', year: 1000, description: 'Հայ ժողովրդական դյուցազներգությունը։' }
    ].map(book => ({
      ...book,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert({ tableName: 'Books', schema: 'online_library' }, books, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'Books', schema: 'online_library' }, null, {});
  }
};
