const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD,
    {
        host:process.env.BD_HOST,
        port: process.env.PORT,
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

const db = {}; //object to be exported
db.sequelize = sequelize; //save the Sequelize instance (actual connection pool)


module.exports = db;