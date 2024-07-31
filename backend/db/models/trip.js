const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Trip extends Model { }

  Trip.init({
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: "trip"
  });
  Trip.associate = function (models) {
    // associations can be defined here
    Trip.belongsTo(models.Site, { foreignKey: 'siteId' })
    Trip.belongsTo(models.User, { foreignKey: 'userId' })

  };
  return Trip;
}