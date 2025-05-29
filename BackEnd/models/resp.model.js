const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const Resp = sequelize.define('Resposta', {
        id_resp: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }/*,
        id_Users: {
            type:DataTypes.STRING,
            allowNull: false
        },
        id_atividade: {
            type:DataTypes.STRING,
            allowNull: false
        }*/
    })
}