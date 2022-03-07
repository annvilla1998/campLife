'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedReviews = (num) => {
      let i = 0;
      let reviewArr = [];
      while (i < num) {
        const review = {
          userId: 1,
          siteId: Math.floor(Math.random() * 199) + 1,
          review: faker.fake('{{random.arrayElement(["Amazing view and place to stay. 100% recommend", "Great camp site. It was private and the set up was really good. Dish washing station, tables for cooking and prepping etc. highly recommend.", "Fantastic campsite. Beautiful setting", "As long as you\'re limber enough to climb a ladder a few times a day and make a fire in a wood stove, this place is ideal for anyone looking for time away in a beautiful, rural setting.", "Short and simple, this place is perfect. Don\'t hesitate booking. Every detail has been thought through.", "Such a wonderful experience! We could not recommend this little gem more! The location was perfect!"])}}'),
          rating: Math.floor(Math.random() * 5) + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        reviewArr.push(review);
        i++;
      }
      return reviewArr;
    }
      return queryInterface.bulkInsert('Reviews', seedReviews(200), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
