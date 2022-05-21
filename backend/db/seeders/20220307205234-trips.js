'use strict';
const faker = require('faker');

module.exports = {
  // up: (queryInterface, Sequelize) => {
  //   return queryInterface.bulkInsert('Trips', [
  //     {
  //       siteId: 1,
  //       userId: 1,
  //       startDate: 'January 1, 2023',
  //       endDate: 'January 3, 2023',
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     }
  //   ], {});
  //   /*
  //     Add altering commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //   */
  // },
  up: (queryInterface, Sequelize) => {
    const seedTrips = (num) => {
      let i = 0;
      let tripArr = [];
      while (i < num) {
        const review = {
          userId: faker.datatype.number({
            'min': 1,
            'max': 3
          }),
          siteId: faker.datatype.number({
            'min': 1,
            'max': 50
          }),
          startDate: faker.date.future(5).toLocaleDateString(),
          endDate: faker.date.future(5).toLocaleDateString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        tripArr.push(review);
        i++;
      }
      return tripArr;
    }
      return queryInterface.bulkInsert('Trips', seedTrips(6), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Trips', null, {});
  }
};
