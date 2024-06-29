const Sequelize = require('sequelize');
const config = require('../../config/database.js');
const Site = require('./site');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

module.exports = { Site, sequelize };