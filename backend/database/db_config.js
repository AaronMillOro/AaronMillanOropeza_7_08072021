const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');


const sequelize = new Sequelize(
  process.env.DATABASE, 
  process.env.USER, 
  process.env.PASSWORD, 
  { host: process.env.DB_HOST, dialect: 'mysql'}
);

sequelize.authenticate()
  .then( () => { console.log('Database connection has been established.') })
  .catch(error => { console.error('Unable to connect to the database:', error) });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// TODO import models


module.exports = db;