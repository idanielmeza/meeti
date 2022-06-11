const Sequelize = require('sequelize');

const meeti = new Sequelize(process.env.DB, process.env.USERDB, process.env.PASSWORDDB, {
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
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