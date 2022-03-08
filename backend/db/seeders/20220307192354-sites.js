'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedSites = (num) => {
      let i = 0;
      let sitesArr = [];
      while(i < num){
        const site = {       
            userId: 1,
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            name: faker.address.streetName(),
            price: faker.commerce.price(50, 2000),
            description: faker.fake('{{random.arrayElement(["Come visit our spot off the grid!", "Use our place as a base camp and explore the region", "Ecological campsite in the heart of the forest a paradise for hikers and nature lovers.", "Whether you are looking for a romantic getaway or rest and relaxation,  look no further."])}}'),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        sitesArr.push(site)
        i++
      }
      return sitesArr
    }
    return queryInterface.bulkInsert('Sites', seedSites(200), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sites', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
