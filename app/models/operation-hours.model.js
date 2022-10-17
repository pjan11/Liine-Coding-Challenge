const Sequelize = require('sequelize');
const db = require('../config/db.config');

const OperationHours = db.define("operation_hours", {
    restaurant_id: {
        type: Sequelize.INTEGER
    },
    start_day: {
        type: Sequelize.INTEGER
    },
    start_time: {
        type: Sequelize.DATE
    },
    end_day: {
        type: Sequelize.INTEGER
    },
    end_time: {
        type: Sequelize.DATE
    }
});
OperationHours.$attributes = {
    full: ['restaurant_id', 'start_day', 'start_time', 'end_day', 'end_time'],
    partial: ['restaurant_id']
}
module.exports = OperationHours;