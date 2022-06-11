const Sequelize = require('sequelize');
const meeti = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuarios = meeti.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(60),
    },
    imagen:{
        type: Sequelize.STRING(60),
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false, 
        validate: {
            isEmail: { msg : 'Agrega un correo válido'},
            notEmpty: { msg : 'El correo es requerido'},
            notNull: { msg : 'El correo es requerido'}
        },
        unique : {
            args: true,
            msg : 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate : {
            notEmpty : {
                msg : 'La contraseña no puede ir vacio'
            },
            notNull : {
                msg : 'La contraseña no puede ir vacio'
            }
        }
    }, 
    activo:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    tokenPassword:{
        type: Sequelize.STRING(60),
    },
    tokenExpira:{
        type: Sequelize.DATE,
    }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, 10);
        }
    }
});

//Metodo para comparar los passwords
Usuarios.prototype.compararPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuarios;