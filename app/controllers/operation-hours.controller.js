const OperationHours = require("../models/operation-hours.model");
const Restaurant = require("../models/restaurant.model");
const db = require('../config/db.config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let moment = require('moment');

// mapping day of week to stored int representation
// this is confusing because of how i originally stored the data
// the framework I used mapped the days of the week differently
// the day of the week in the db is the index => [mon, tue, wed, thu, fri, sat, sun]
const days = ["1","2", "3", "4", "5", "6", "0"];

/* 
Retrieve all that are open at the specified time
Request assumes that if no time is given it will check with time 00:00:00
*/
async function findOpenRestaurants(req, res) {
    try {
        let earlyFlag = false;
        let date = moment(req.query.date);
        if (!date.isValid()) return res.status(400).send({ message: 'Invalid Date input.' });

        // get the day of the week and the time
        let dayOfTheWeek = days.indexOf(date.format('d'));
        let timeOfDay = date.format('HH:mm:ss');
        let time = timeOfDay.split(":");

        earlyFlag = parseInt(time[0]) < 7 ? true : false;

        const operationHours = await getOperationHours(dayOfTheWeek, earlyFlag);

        if (!operationHours) return res.status(404).send({ message: 'Cannot find operation hours or none exists.' });

        const resultSet = operationHours.map(x => x.dataValues);

        // handle stores that close late i.e. closing in the AM the next day
        const filteredList = earlyFlag ? 
            resultSet.filter(hours => {return hours.end_time > timeOfDay}) : 
            resultSet.filter(hours => {return hours.start_time <= timeOfDay && hours.end_time > timeOfDay;})
        
        if (filteredList.length > 0) {
            const names = await getRestaurantNames(filteredList);
            res.json(names);
        } else {
            res.send("No data matches the criteria");
        }
    } catch (err) {
        res.status(404).send({ message: 'Cannot find operation hours or none exists.' });
    }
}

const getOperationHours = async (dayOfTheWeek, earlyFlag) => {
    // setting closing time cutoff check at 6:59:59
    let whereCondition = {};
    let result;
    if (earlyFlag) {
        console.log('early morning');
        earlyFlag = true;
        whereCondition = {
            ...(dayOfTheWeek - 1 == -1 ? { start_day: 6 } : { start_day: dayOfTheWeek - 1 }),
            end_day: dayOfTheWeek
        };
    } else {
        whereCondition = {
            start_day: dayOfTheWeek,
            end_day: {
                [Op.gte]: dayOfTheWeek
            }
        };
    }

    if (dayOfTheWeek >= 0 && dayOfTheWeek < 7) {
        result = await OperationHours.findAll({
            where: whereCondition,
            attributes: [...OperationHours.$attributes.full]
        });
    }

    return result;
}

const getRestaurantNames = async (operationHours) => {
    const restaurant_ids = operationHours.map(hours => hours.restaurant_id);

    const restaurants = await Restaurant.findAll({
        where: {
            id: {
                [Op.in]: restaurant_ids
            }
        },
        attributes: [...Restaurant.$attributes.partial]
    });

    return restaurants;
};

module.exports = {
    findOpenRestaurants
};