const express = require('express');
const cors = require("cors");
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/config/db.config');

db.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch(err => console.log(`Error: ${err}`));

// app.use('/api/restaurants', require('./app/routes/restaurant.routes'));
app.use('/api/operationHours', require('./app/routes/operation-hours.routes'));

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});