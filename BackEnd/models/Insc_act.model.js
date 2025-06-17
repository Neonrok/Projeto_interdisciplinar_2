const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const Inact = sequelize.define('inscrits_Act', {
        id_atividade: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        id_Users: {
            type:DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Inact;
}