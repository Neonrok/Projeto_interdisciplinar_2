const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const Act = sequelize.define('Reuniao', {
        id_reuniao: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type:DataTypes.STRING,
            allowNull: false
        },
        body: {
            type:DataTypes.STRING,
            allowNull: false
        },
        dat: {
            type:DataTypes.DATE,
            allowNull: false
        },
        id_Users: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timetamps: false,
        freezeTableName: true
    });
    return Act;
}