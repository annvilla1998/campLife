const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Review = sequelize.define('Review', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  siteId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  review: {
    type: Sequelize.STRING(255),
    allowNull: false

  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    max: 5,
    min: 0
  }
}, {});
Review.associate = function (models) {
  // associations can be defined here
  Review.belongsTo(models.User, { foreignKey: "userId" })
  Review.belongsTo(models.Site, { foreignKey: "siteId" })

};

module.exports = Review;
