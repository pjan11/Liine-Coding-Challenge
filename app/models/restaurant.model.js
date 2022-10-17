const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Restaurant = db.define("restaurant", {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});
Restaurant.$attributes = {
    full: ['id', 'name'],
    partial: ['name']
}
module.exports = Restaurant;