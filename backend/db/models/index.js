const Sequelize = require('sequelize');
const config = require('../../config/database.js');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig);

const models = {
    User: require('./user')(sequelize, Sequelize.DataTypes),
    Trip: require('./trip')(sequelize, Sequelize.DataTypes),
    Site: require('./site')(sequelize, Sequelize.DataTypes),
    Review: require('./review')(sequelize, Sequelize.DataTypes),
}

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = { sequelize, models, Sequelize };