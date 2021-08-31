const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Season = connection.define('temporadas', {
   
    temporadaAno:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },    
    temporadaUrl:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }},
    {
        freezeTableName: true,
        timestamps: false
    }
);

//Season.sync({force: true});
module.exports = Season;    