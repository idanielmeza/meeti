const Sequelize = require('sequelize');

const meeti = new Sequelize('meeti', 'postgres', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

module.exports = meeti;