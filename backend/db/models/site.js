const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Site = sequelize.define('Site', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(20, 2),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  }
}, {});


Site.associate = function (models) {
  // associations can be defined here
  Site.belongsTo(models.User, { foreignKey: 'userId' })
  Site.hasMany(models.Trip, {
    foreignKey: 'siteId',
    onDelete: 'CASCADE',
    hooks: true
  })
  // Site.hasMany(models.Image, { foreignKey: 'siteId',
  //   onDelete: 'CASCADE',
  //   hooks: true
  // })
  Site.hasMany(models.Review, {
    foreignKey: 'siteId',
    onDelete: 'CASCADE',
    hooks: true
  })

};


module.exports = Site;
