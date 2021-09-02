const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Circuit = require("./Circuit");
const Season = require("./Season");

const Racer= connection.define('corridas', {
  
    corridaId:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        omitNull: true      
    },

    corridaNumero:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },

    corridaNome:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    corridaData:{
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
    },

    corridaHora:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        omitNull: true
    },

    corridaUrl:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },

    circuitoRef:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
         
    temporadaAno:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    }
        },
    {
        freezeTableName: true,
        timestamps: false
    }


);

module.exports = Racer;    