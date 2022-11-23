const config = require('../config');
const Sequelize = require("sequelize");
const { db: { host, user, password, database} } = config;

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
      host: host,
      dialect: 'mysql',
      logging: false
    }
  );

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = {
    sequelize
};