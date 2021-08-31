const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Circuit = connection.define('circuitos', {
    
    circuitoId:{
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },

    circuitoRef:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },  

    circuitoNome:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    circuitoLocalizacao:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },

    circuitoPais:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },

    circuitoLatitude:{
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
    },

    circuitoLongitude:{
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
    },

    circuitoAltitude:{
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
    },

    circuitoUrl:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    circuitoFoto:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }

);

//Circuit.sync({force: true});
module.exports = Circuit;    