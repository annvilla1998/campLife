'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    
    // Check existing data to avoid unique constraint conflicts
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT email, username FROM Users WHERE email IN ('demo@user.io', 'user1@user.io', 'user2@user.io') OR username IN ('Demo-lition', 'FakeUser1', 'FakeUser2')`
    );
    
    if (existingUsers[0].length > 0) {
      console.log('Existing users found:', existingUsers[0]);
      throw new Error('Duplicate data found. Seeder cannot be applied.');
    }

    // Correct hashedPassword field length and ensure unique values
    const usersToInsert = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password', 10),
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2', 10)
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3', 10)
      }
    ];

    for (const user of usersToInsert) {
      if (user.hashedPassword.length !== 60) {
        console.error('Invalid hashedPassword length:', user);
        throw new Error('Invalid hashedPassword length.');
      }
    }

    try {
      await queryInterface.bulkInsert(options, usersToInsert, {});
      console.log('Seeding completed successfully.');
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error; // Throw the error to indicate failure
    }
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';

    try {
      await queryInterface.bulkDelete(options, {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      });
      console.log('Down migration completed successfully.');
    } catch (error) {
      console.error('Error during down migration:', error);
      throw error; // Throw the error to indicate failure
    }
  }
};