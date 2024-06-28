module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: './test.sqlite',
    logging: false
  },
  production: {
    dialect: 'sqlite',
    storage: './production.sqlite',
    logging: false
  }
};