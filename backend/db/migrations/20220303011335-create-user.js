'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let options = {};
        if (process.env.NODE_ENV === 'production') {
            options.schema = process.env.SCHEMA;  // Define your schema in options object if needed
        }

        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING(256),
                allowNull: false,
                unique: true
            },
            hashedPassword: {
                type: Sequelize.BLOB,  // Use BLOB for SQLite compatibility
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATEONLY,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATEONLY,
                defaultValue: Sequelize.NOW
            }
        }, options);

        // Add composite unique index
        await queryInterface.addIndex('Users', ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'], {
            unique: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};
