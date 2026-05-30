if (typeof window === 'undefined' && !process.env.DB_USERNAME) {
  try {
    const dotenv = 'dotenv';
    require(dotenv).config();
  } catch (e) {}
}

const schemaConfig = {
  migrationStorageTableSchema: 'online_library',
  seederStorageTableSchema: 'online_library',
  define: {
    schema: 'online_library'
  },
  searchPath: 'online_library'
};

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    ...schemaConfig
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    ...schemaConfig
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    ...schemaConfig
  }
};
