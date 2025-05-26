//Explicação como funciona a base de dados para o sequelize

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: { 
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Username already exists'
            },
            allowNull: false
        },
        password: {
            
        }
    })
}