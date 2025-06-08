const { preProcessFile } = require("typescript");

//Explicação como funciona a base de dados para o sequelize
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Perfil', {
        id_Users: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type:DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Node repetido'
            },
            allowNull: false
        },
        Email:{
            type:DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Email repetido'
            },
            allowNull: false
        },
        P_W: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true
        },
        membro: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        secretariado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        coordenador: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return User;
}