'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    siteId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.Site, { foreignKey: 'siteId'})
    Trip.belongsTo(models.User, { foreignKey: 'userId'})

  };
  return Trip;
};