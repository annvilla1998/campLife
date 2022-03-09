'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {});
  Site.associate = function(models) {
    // associations can be defined here
    Site.belongsTo(models.User, { foreignKey: 'userId' })
    Site.hasMany(models.Trip, { foreignKey: 'siteId',
    onDelete: 'CASCADE',
    hooks: true
  })
    Site.hasMany(models.Image, { foreignKey: 'siteId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Site.hasMany(models.Review, { foreignKey: 'siteId',
      onDelete: 'CASCADE',
      hooks: true
  })

  };
  return Site;
};