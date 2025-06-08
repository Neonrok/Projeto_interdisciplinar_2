const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const RelAts = sequelize.define('Atas_Ats', {
        id_at_act:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_atividade: {
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
    return RelAts;
}