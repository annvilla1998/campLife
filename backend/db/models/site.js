const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Site extends Model { }

  Site.init({
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
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image1: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    image2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: "site"
  });


  Site.associate = function (models) {
    // associations can be defined here
    Site.belongsTo(models.User, { foreignKey: 'userId' })
    Site.hasMany(models.Trip, {
      foreignKey: 'siteId',
      onDelete: 'CASCADE',
      hooks: true,
    })

  };

  return Site;
}
