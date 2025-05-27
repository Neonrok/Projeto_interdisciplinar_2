//Explicação como funciona a base de dados para o sequelize

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Perfil', {
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
        cargo_id: {
            type: DataTypes.ENUM(1, 2, 3, 4, 5, 6),
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2, 3, 4, 5, 6]],
                    msg: "Role not recognised"
                }
            }
        }
    }, {
        timetamps: false
    });
    return User;
}