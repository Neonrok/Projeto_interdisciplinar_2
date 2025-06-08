const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS,
    {
        host:process.env.BD_HOST,
        dialect: process.env.BD_DIALECT,
        port: process.env.BD_PORT,
        pool: {
            max: 5, // maximum number of connections in pool
            min: 0, // minimum number of connections in pool
            acquire: 30000, // maximum time (in ms) that a connection can be idle before being released
            idle: 10000 // maximum time (in ms) that a connection can be idle before being released
        }
    }
);

// test de conecção
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1); // exit the process with a failure code
    }
}
)();

const bd = {}; 
bd.sequelize = sequelize;
//Defenições de dependencias para o sequelize usar o my sql
bd.Perfil = require("./users.model.js")(sequelize, Sequelize.DataTypes);
bd.Atividades = require("./Act.model.js")(sequelize, Sequelize.DataTypes);
bd.Reuniao = require("./reuniao.model.js")(sequelize, Sequelize.DataTypes);
bd.inscrits_Act = require("./Insc_act.model.js")(sequelize, Sequelize.DataTypes);



//defenir relações

bd.Perfil.hasMany(bd.Atividades, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.Atividades.belongsTo(bd.Perfil, {foreignKey: 'id_Users', as: 'Username', onDelete: 'RESTRICT', allowNull: false});

bd.Perfil.hasMany(bd.Reuniao, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.Reuniao.belongsTo(bd.Perfil, {foreignKey: 'id_Users',as: 'User_Ren', onDelete: 'RESTRICT', allowNull: false});

bd.inscrits_Act.hasMany(bd.Perfil, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.Perfil.belongsTo(bd.inscrits_Act, {foreignKey: 'id_Users',as: 'User_Ren', onDelete: 'RESTRICT', allowNull: false});




(async () => {
    try {
        await bd.sequelize.sync({ alter: true });
        console.log('DB is successfully synchronized')
    } catch (error) {
        console.log(error)
    }
})();

module.exports = bd;