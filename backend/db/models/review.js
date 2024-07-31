const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Review extends Model { }

  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING(255),
      allowNull: false

    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 5,
      min: 0
    }
  }, {
    sequelize,
    modelName: "review"
  });
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: "userId" })
    Review.belongsTo(models.Site, { foreignKey: "siteId" })

  };
  return Review;
}
