const Sequelize = require('sequelize');
const meeti = require('../config/db');


const Categorias = meeti.define('categorias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.TEXT,
    }
})

module.exports = Categorias;