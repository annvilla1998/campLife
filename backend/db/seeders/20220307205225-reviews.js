'use strict';
const faker = require('faker');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    const userIds = users[0].map(user => user.id);

    const sites = await queryInterface.sequelize.query(
      `SELECT id FROM "Sites";`
    );
    const siteIds = sites[0].map(site => site.id);

    const seedReviews = (num) => {
      let i = 0;
      let reviewArr = [];
      while (i < num) {
        const review = {
          userId: userIds[Math.floor(Math.random() * userIds.length)],
          siteId: siteIds[Math.floor(Math.random() * siteIds.length)],
          review: faker.fake('{{random.arrayElement(["Amazing view and place to stay. 100% recommend", "Great camp site. It was private and the set up was really good. Dish washing station, tables for cooking and prepping etc. highly recommend.", "Fantastic campsite. Beautiful setting", "As long as you\'re limber enough to climb a ladder a few times a day and make a fire in a wood stove, this place is ideal for anyone looking for time away in a beautiful, rural setting.", "Short and simple, this place is perfect. Don\'t hesitate booking. Every detail has been thought through.", "Such a wonderful experience! We could not recommend this little gem more! The location was perfect!"])}}'),
          rating: Math.floor(Math.random() * 5) + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        reviewArr.push(review);
        i++;
      }
      return reviewArr;
    };

    return queryInterface.bulkInsert(options, seedReviews(100), {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};