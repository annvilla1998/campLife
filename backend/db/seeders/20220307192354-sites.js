'use strict';
const faker = require('faker');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Sites';

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    const userIds = users[0].map(user => user.id);

    const campsites = [
      "https://thumbs.dreamstime.com/b/travel-trailer-rv-camping-campground-pickup-vacation-summer-62617458.jpg",
      "https://thumbs.dreamstime.com/b/camping-alaska-i-took-picture-northern-lights-below-miles-down-denali-hwy-cantwell-78121574.jpg",
      "https://thumbs.dreamstime.com/b/desert-camping-airstream-mountains-distance-remote-boondocking-dry-blm-location-borrego-springs-california-129307650.jpg",
      "https://thumbs.dreamstime.com/b/luxury-tent-campsite-sunset-full-bed-rugs-perfect-glamping-glamping-tent-site-desert-sunset-183897073.jpg",
      "https://thumbs.dreamstime.com/b/glamping-lifestyle-boiling-kettle-steam-near-big-retro-camping-tent-luxury-travel-accomodation-forest-133376071.jpg",
      "https://thumbs.dreamstime.com/b/jul-kanchanaburi-thailand-luxurious-camping-resort-nature-forest-glamping-vacation-tropical-asian-country-luxurious-camping-122128601.jpg",
      "https://thumbs.dreamstime.com/b/lovely-romantic-glamping-two-wild-seashore-unique-way-to-celebrate-your-love-romantic-camping-trip-two-116285011.jpg",
      "https://thumbs.dreamstime.com/b/luxury-accommodation-glamping-chile-south-modern-tent-national-park-torres-del-paine-chilenian-patagonia-158939546.jpg",
      "https://thumbs.dreamstime.com/b/jul-kanchanaburi-thailand-luxurious-camping-resort-nature-forest-glamping-vacation-tropical-asian-country-luxurious-camping-122128751.jpg",
      "https://thumbs.dreamstime.com/b/glamping-cabin-woods-campsite-canvas-tent-fully-furnished-fire-pit-picnic-area-forest-64927468.jpg",
      "https://thumbs.dreamstime.com/b/glamping-bali-beach-bubble-house-transparent-walls-white-wooden-double-bed-mosquito-net-inside-honeymoon-inflatable-173033747.jpg"
    ];

    const seedSites = (num) => {
      let i = 0;
      let sitesArr = [];
      while(i < num){
        const site = {       
          userId: userIds[Math.floor(Math.random() * userIds.length)],
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          name: faker.address.streetName(),
          price: faker.commerce.price(50, 500),
          description: faker.fake('{{random.arrayElement(["Come visit our spot off the grid!", "Use our place as a base camp and explore the region", "Ecological campsite in the heart of the forest a paradise for hikers and nature lovers.", "Whether you are looking for a romantic getaway or rest and relaxation,  look no further."])}}'),
          image1: faker.fake(campsites[Math.floor(Math.random() * campsites.length)]),
          image2: faker.fake(campsites[Math.floor(Math.random() * campsites.length)]),
          image3: faker.fake(campsites[Math.floor(Math.random() * campsites.length)]),
          image4: faker.fake(campsites[Math.floor(Math.random() * campsites.length)]),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        sitesArr.push(site);
        i++;
      }
      return sitesArr;
    };

    try {
      await queryInterface.bulkInsert(options, seedSites(50), {});
      console.log('Seeding completed successfully.');
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error; // Throw the error to indicate failure
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Sites';

    try {
      await queryInterface.bulkDelete(options, null, {});
      console.log('Down migration completed successfully.');
    } catch (error) {
      console.error('Error during down migration:', error);
      throw error; // Throw the error to indicate failure
    }
  }
};