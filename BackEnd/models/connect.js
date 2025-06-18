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
        },
        define: {
            noPrimaryKey: true,
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
bd.convites_ren = require("./convites_ren.model.js")(sequelize, Sequelize.DataTypes);
bd.Atas_ren = require("./Atas_ren.model.js")(sequelize, Sequelize.DataTypes);
bd.Atas_Ats = require("./Atas_Ats.model.js")(sequelize, Sequelize.DataTypes);



//defenir relações

bd.Perfil.hasMany(bd.Atividades, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.Atividades.belongsTo(bd.Perfil, {foreignKey: 'id_Users', as: 'Username', onDelete: 'RESTRICT', allowNull: false});

bd.Perfil.hasMany(bd.Reuniao, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.Reuniao.belongsTo(bd.Perfil, {foreignKey: 'id_Users',as: 'User_Ren', onDelete: 'RESTRICT', allowNull: false});

bd.Perfil.hasMany(bd.inscrits_Act, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.inscrits_Act.belongsTo(bd.Perfil, {foreignKey: 'id_Users',as: 'User_Insc', onDelete: 'RESTRICT', allowNull: false});

bd.Atividades.hasMany(bd.inscrits_Act, {foreignKey: 'id_atividade', onDelete: 'RESTRICT', allowNull: false});
bd.inscrits_Act.belongsTo(bd.Atividades, {foreignKey: 'id_atividade',as: 'Act_Insc', onDelete: 'RESTRICT', allowNull: false});

bd.Perfil.hasMany(bd.convites_ren, {foreignKey: 'id_Users', onDelete: 'RESTRICT', allowNull: false});
bd.convites_ren.belongsTo(bd.Perfil, {foreignKey: 'id_Users',as: 'User_Conv', onDelete: 'RESTRICT', allowNull: false});

bd.Reuniao.hasMany(bd.convites_ren, {foreignKey: 'id_reuniao', onDelete: 'RESTRICT', allowNull: false});
bd.convites_ren.belongsTo(bd.Reuniao, {foreignKey: 'id_reuniao',as: 'Ren_conv', onDelete: 'RESTRICT', allowNull: false});

bd.Reuniao.hasMany(bd.Atas_ren, {foreignKey: 'id_reuniao', onDelete: 'RESTRICT', allowNull: false});
bd.Atas_ren.belongsTo(bd.Reuniao, {foreignKey: 'id_reuniao',as: 'Rel_Ren', onDelete: 'RESTRICT', allowNull: false});

bd.Atividades.hasMany(bd.Atas_Ats, {foreignKey: 'id_atividade', onDelete: 'RESTRICT', allowNull: false});
bd.Atas_Ats.belongsTo(bd.Atividades, {foreignKey: 'id_atividade',as: 'Rel_Act', onDelete: 'RESTRICT', allowNull: false});
/*
 (async () => {
    try {
         await bd.sequelize.sync({ alter: true });
         console.log('DB is successfully synchronized')
     } catch (error) {
         console.log(error)
     }
})();
*/
module.exports = bd;