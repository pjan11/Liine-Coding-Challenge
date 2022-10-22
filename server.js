const express = require('express');
const cors = require("cors");
const mysql = require('mysql');
const csvtojson = require('csvtojson');

dbSetup();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/config/db.config');

db.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch(err => console.log(`Error: ${err}`));

app.use('/api/operationHours', require('./app/routes/operation-hours.routes'));

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});

async function dbSetup() {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password"
    });

    // Create Database
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected");
        con.query("CREATE DATABASE challengedb", (err, result => {
            if (err) throw err;
            console.log("Database created");
        }));
    });

    await createRestaurantTable();
    await createOperationHoursTable();
}

async function createRestaurantTable() {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "challengedb"
    });

    // Create Database
    con.connect((err) => {
        if (err) throw err;

        con.query("DROP TABLE restaurants", (err, drop) => {
            if (err) console.log(err);
        });

        let createStatement = "CREATE TABLE restaurants(name char(50), id int)";

        con.query(createStatement, (err, drop) => {
            if (err) console.log(err);
        });

    });

    csvtojson().fromFile('restaurants.csv').then(source => {
        for (let i = 0; i < source.length; i++) {
            let name = source[i]["name"],
                id = source[i]["id"]

            var insertStatement =
                `INSERT INTO restaurants values(?, ?)`;
            var items = [name, id];

            con.query(insertStatement, items,
                (err, results, fields) => {
                    if (err) {
                        console.log(
                            "Unable to insert item at row ", i + 1);
                        return console.log(err);
                    }
                });
        }
        console.log(
            "All items stored into restaurants successfully");
    });
}

async function createOperationHoursTable() {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "challengedb"
    });

    // Create Database
    con.connect((err) => {
        if (err) throw err;

        con.query("DROP TABLE operation_hours", (err, drop) => {
            if (err) console.log(err);
        });

        let createStatement = "CREATE TABLE operation_hours(restaurant_id int, start_day int, start_time TIME, end_day int, end_time TIME)";

        con.query(createStatement, (err, drop) => {
            if (err) console.log(err);
        });

    });

    csvtojson().fromFile('operation_hours.csv').then(source => {
        for (let i = 0; i < source.length; i++) {
            let restaurant_id = source[i]["restaurant_id"],
                start_day = source[i]["start_day"],
                start_time = source[i]["start_time"],
                end_day = source[i]["end_day"],
                end_time = source[i]["end_time"]

            var insertStatement =
                `INSERT INTO operation_hours values(?, ?, ?, ?, ?)`;
            var items = [restaurant_id, start_day, start_time, end_day, end_time];

            con.query(insertStatement, items,
                (err, results, fields) => {
                    if (err) {
                        console.log(
                            "Unable to insert item at row ", i + 1);
                        return console.log(err);
                    }
                });
        }
        console.log(
            "All items stored into operation hours successfully");
    });
}
