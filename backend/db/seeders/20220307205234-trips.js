'use strict';
const faker = require('faker');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Trips';

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    const userIds = users[0].map(user => user.id);

    const sites = await queryInterface.sequelize.query(
      `SELECT id FROM "Sites";`
    );
    const siteIds = sites[0].map(site => site.id);

    const seedTrips = (num) => {
      let i = 0;
      let tripArr = [];
      while (i < num) {
        const startDate = faker.date.future(5);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + faker.datatype.number({ min: 1, max: 14 })); // Ensure endDate is after startDate

        const trip = {
          userId: userIds[Math.floor(Math.random() * userIds.length)],
          siteId: siteIds[Math.floor(Math.random() * siteIds.length)],
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        tripArr.push(trip);
        i++;
      }
      return tripArr;
    };

    return queryInterface.bulkInsert(options, seedTrips(6), {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Trips';
    return queryInterface.bulkDelete(options, null, {});
  }
};