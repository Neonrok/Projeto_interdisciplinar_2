const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const Inact = sequelize.define('convites_ren', {
        id_reuniao: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        id_Users: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        inscrito: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        presente: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return Inact;
}