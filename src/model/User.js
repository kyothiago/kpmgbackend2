const Sequelize = require("sequelize");
const connection = require("../database/connection");

const User = connection.define('usuario', {
    
    usuarioId:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    usuarioLogin:{
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,

    }, usuarioNome:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,

    }, usuarioEmail:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    usuarioSenha:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    usuarioCelular:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }},
    {
        freezeTableName: true,
        timestamps: false
    }
);

//User.sync({force: true});
module.exports = User;