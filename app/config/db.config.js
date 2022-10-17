// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "password",
//     DB: "restaurant_data",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };

const Sequelize = require("sequelize");
module.exports = new Sequelize('restaurant_data', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});