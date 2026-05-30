'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const books = [
<<<<<<< Updated upstream
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
=======
      // New books (prepended) with Armenian titles and one‑sentence descriptions
      { title: 'Հոբիտը', authorName: 'J.R.R. Tolkien', year: 1937, language: 'English', description: 'A classic fantasy adventure about a small hero on a perilous quest.' },
      { title: 'Անդրոմեդա՝ Տարածման‑Զարթված Բանարարություն', authorName: 'Ivan', year: 1957, language: 'Russian', description: 'A futuristic tale of space exploration and human ambition.' },
      { title: 'Նարուկ և Տարգումը', authorName: 'Fyodor Dostoevsky', year: 1866, language: 'Russian', description: 'A profound psychological drama exploring morality and redemption.' },
      { title: 'Անձավեր Գենե', authorName: 'Richard Dawkins', year: 1976, language: 'English', description: 'An influential work on evolution and the selfish nature of genes.' },
      { title: 'Մուռգի փողոցում Խորտիկներ', authorName: 'Edgar Allan Poe', year: 1841, language: 'English', description: 'A pioneering detective story that introduced the genre.' },
      { title: 'Բաժեղի Սև', authorName: 'Andrzej Sapkowski', year: 1992, language: 'English', description: 'A short fantasy tale featuring the witcher’s destiny.' },
      { title: 'Ոչ Երկիր Հին Անձրեւի Բանարություն', authorName: 'Cormac McCarthy', year: 2005, language: 'English', description: 'A bleak crime thriller set in a ruthless world.' },
      { title: 'Զարդ', authorName: 'John Doe', year: 2017, language: 'English', description: 'A modern story that explores contemporary relationships.' },
      { title: 'Պաստակները: Գրքի առաջին հատոր', authorName: 'J.R.R. Tolkien', year: 1954, language: 'English', description: 'The epic beginning of the famed Middle‑Earth saga.' },
      { title: 'Պաստակները: Գրքի մեկերորդ հատոր', authorName: 'J.R.R. Tolkien', year: 1954, language: 'English', description: 'The continuation of the epic quest with rising stakes.' },
      // Existing books (unchanged) without filePath
      { title: 'Bull’s Hour', authorName: 'Ivan Efremov', year: 1968, language: 'Russian', description: 'Sci‑fi novella exploring human ambition in a distant future.' },
      { title: 'Thais of Athens', authorName: 'Ivan Efremov', year: 1972, language: 'Russian', description: 'Historical story about a Greek woman navigating ancient politics.' },
      { title: 'The Brothers Karamazov', authorName: 'Fyodor Dostoevsky', year: 1880, language: 'Russian', description: 'Philosophical novel delving into faith, doubt, and family conflict.' },
      { title: 'The Idiot', authorName: 'Fyodor Dostoevsky', year: 1869, language: 'Russian', description: 'Tragic romance of a naive nobleman confronting society.' },
      { title: 'Blood Meridian', authorName: 'Cormac McCarthy', year: 1985, language: 'English', description: 'Violent western depicting the brutality of the American frontier.' },
      { title: 'The Road', authorName: 'Cormac McCarthy', year: 2006, language: 'English', description: 'Post‑apocalyptic journey of a father and son seeking hope.' },
      { title: 'Blood of Elves', authorName: 'Andrzej Sapkowski', year: 1994, language: 'Polish', description: 'Fantasy novel following Geralt’s clash with elven politics.' },
      { title: 'Time of Contempt', authorName: 'Andrzej Sapkowski', year: 1995, language: 'Polish', description: 'Fantasy sequel that deepens the saga’s political intrigue.' },
      { title: 'The Tell‑Tale Heart', authorName: 'Edgar Allan Poe', year: 1843, language: 'English', description: 'Psychological horror about guilt and obsession.' },
      { title: 'The Fall of the House of Usher', authorName: 'Edgar Allan Poe', year: 1839, language: 'English', description: 'Gothic tale of a haunted family estate.' },
      { title: 'Beyond the Sea', authorName: 'John Lynch', year: 2020, language: 'English', description: 'Modern drama exploring love and loss across continents.' },
      { title: 'The Black Snow', authorName: 'John Lynch', year: 2014, language: 'English', description: 'Mystery thriller set in a remote mountain town.' },
      { title: 'The God Delusion', authorName: 'Richard Dawkins', year: 2006, language: 'English', description: 'Science book challenging religious belief with evolutionary evidence.' },
      { title: 'The Extended Phenotype', authorName: 'Richard Dawkins', year: 1982, language: 'English', description: 'Evolution theory expanding the concept of gene influence.' },
      { title: 'Foundation', authorName: 'Isaac Asimov', year: 1951, language: 'English', description: 'Sci‑fi classic about the fall and rise of a galactic empire.' },
      { title: 'Foundation and Empire', authorName: 'Isaac Asimov', year: 1952, language: 'English', description: 'Sci‑fi sequel focusing on empire’s struggle against a new threat.' },
      { title: 'Second Foundation', authorName: 'Isaac Asimov', year: 1953, language: 'English', description: 'Continuation of the Foundation saga exploring hidden intellects.' },
      { title: 'I, Robot', authorName: 'Isaac Asimov', year: 1950, language: 'English', description: 'Collection of robot stories examining ethics and AI.' },
      { title: 'It', authorName: 'Stephen King', year: 1986, language: 'English', description: 'Horror novel about a shape‑shifting entity terrorizing a town.' },
      { title: 'The Shining', authorName: 'Stephen King', year: 1977, language: 'English', description: 'Psychological horror set in an isolated, haunted hotel.' },
      { title: 'Carrie', authorName: 'Stephen King', year: 1974, language: 'English', description: 'Teen horror revolving around telekinetic powers and revenge.' },
      { title: 'Pride and Prejudice', authorName: 'Jane Austen', year: 1813, language: 'English', description: 'Romantic satire about manners, marriage, and misunderstandings.' },
      { title: 'Sense and Sensibility', authorName: 'Jane Austen', year: 1811, language: 'English', description: 'Classic romance exploring reason versus emotion.' },
      { title: 'Murder on the Orient Express', authorName: 'Agatha Christie', year: 1934, language: 'English', description: 'Detective mystery where Poirot solves a locked‑room murder.' },
      { title: 'And Then There Were None', authorName: 'Agatha Christie', year: 1939, language: 'English', description: 'Crime thriller where strangers are eliminated one by one.' },
      { title: 'Steve Jobs', authorName: 'Walter Isaacson', year: 2011, language: 'English', description: 'Biography chronicling the life of Apple’s visionary founder.' },
      { title: 'Einstein: His Life and Universe', authorName: 'Walter Isaacson', year: 2007, language: 'English', description: 'Scientific biography describing Einstein’s genius and humanity.' },
      { title: 'Hondo', authorName: 'John L. Lamour', year: 1953, language: 'English', description: 'Western story about a gunslinger seeking redemption.' },
      { title: 'Sackett’s Land', authorName: 'John L. Lamour', year: 1974, language: 'English', description: 'Adventure novel set in the rugged American frontier.' },
      { title: 'The Notebook', authorName: 'Nicholas Sparks', year: 1996, language: 'English', description: 'Romantic drama about enduring love across decades.' },
      { title: 'A Walk to Remember', authorName: 'Nicholas Sparks', year: 1999, language: 'English', description: 'Teen romance depicting first love and personal growth.' },
      { title: 'Wuthering Heights', authorName: 'Emily Brontë', year: 1847, language: 'English', description: 'Gothic romance about passionate, destructive love.' },
      { title: 'Gone Girl', authorName: 'Gillian Flynn', year: 2012, language: 'English', description: 'Psychological thriller following a vanished wife and media frenzy.' },
      { title: 'Sharp Objects', authorName: 'Gillian Flynn', year: 2006, language: 'English', description: 'Murder mystery centered on a reporter returning to her hometown.' },
      { title: 'The Da Vinci Code', authorName: 'Dan Brown', year: 2003, language: 'English', description: 'Historical thriller uncovering secret societies and riddles.' },
      { title: 'Inferno', authorName: 'Dan Brown', year: 2013, language: 'English', description: 'Fast‑paced thriller chasing clues in art and disease.' },
      { title: 'The Power Broker', authorName: 'Robert Caro', year: 1974, language: 'English', description: 'Political biography detailing Robert Moses’s rise and impact.' },
      { title: 'Means of Ascent', authorName: 'Robert Caro', year: 1990, language: 'English', description: 'Political analysis of power structures in American history.' },
      { title: 'Hamilton', authorName: 'Sebastian Junger', year: 2004, language: 'English', description: 'Historical account of the famous 19th‑century soldier and explorer.' },
      { title: 'Washington: A Life', authorName: 'Ron Chernow', year: 2010, language: 'English', description: 'Presidential biography exploring the founding father’s complex legacy.' }
    ].map(b => ({ ...b, createdAt: new Date(), updatedAt: new Date() }));
    await queryInterface.bulkInsert('Books', books, {});
>>>>>>> Stashed changes
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'Books', schema: 'online_library' }, null, {});
  }
};
