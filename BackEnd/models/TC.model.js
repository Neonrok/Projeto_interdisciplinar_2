const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const TC = sequelize.define('Tipo_Cargos', {
        id_cargo: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cargo: {
            type:DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Node repetido'
            },
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return TC;
}