'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Sites', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: 'Users' },
                allowNull: false

            },
            address: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            country: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(20, 2),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            images: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, options);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Sites', options);
    }
};