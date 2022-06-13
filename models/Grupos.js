const Sequelize = require('sequelize');
const meeti = require('../config/db');
const Categorias = require('./Categorias');
const Usuarios = require('./Usuarios');

const Grupos = meeti.define('grupos', {
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.TEXT,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'El nombre del grupo es requerido'
            }
        }
    },
    descripcion:{
        type: Sequelize.TEXT,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'La descripcion del grupo es requerida'
            }
        }
    },
    url:{
        type: Sequelize.TEXT
    },
    imagen:{
        type: Sequelize.TEXT
    }
})

Grupos.belongsTo(Categorias);
Grupos.belongsTo(Usuarios);

module.exports = Grupos;