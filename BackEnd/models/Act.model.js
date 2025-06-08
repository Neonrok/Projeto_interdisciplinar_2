const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const Act = sequelize.define('Atividades', {
        id_atividade: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        d_inicio: {
            type:DataTypes.DATEONLY,
            allowNull: false
        },
        d_fim: {
            type:DataTypes.DATEONLY,
            allowNull: false
        },
        titulo: {
            type:DataTypes.STRING,
            allowNull: false
        },
        body: {
            type:DataTypes.STRING,
            allowNull: false
        },
        id_Users: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        aprovado: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completo: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Act;
}