const Sequelize = require('sequelize');
const sequelize = require('../../config/database');


const Trip = sequelize.define('Trip', {
  siteId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
}, {});
Trip.associate = function (models) {
  // associations can be defined here
  Trip.belongsTo(models.Site, { foreignKey: 'siteId' })
  Trip.belongsTo(models.User, { foreignKey: 'userId' })

};

module.exports = Trip;