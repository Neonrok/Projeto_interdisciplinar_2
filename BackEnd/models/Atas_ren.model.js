const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const RelRen = sequelize.define('Atas_ren', {
        id_Atas_Ren:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_reuniao: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        relatorio: {
            type:DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return RelRen;
}