'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const genreModel = require('./genre.js')(sequelize, Sequelize.DataTypes);
db[genreModel.name] = genreModel;

const authorModel = require('./author.js')(sequelize, Sequelize.DataTypes);
db[authorModel.name] = authorModel;

const bookModel = require('./book.js')(sequelize, Sequelize.DataTypes);
db[bookModel.name] = bookModel;

const readerModel = require('./reader.js')(sequelize, Sequelize.DataTypes);
db[readerModel.name] = readerModel;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
