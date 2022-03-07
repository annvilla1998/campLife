'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Site, { foreignKey: "siteId"})
  };
  return Image;
};