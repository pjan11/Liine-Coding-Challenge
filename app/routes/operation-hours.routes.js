const router = require("express").Router();
const operationHours = require("../controllers/operation-hours.controller.js");

// router.get('/', operationHours.findAllOperationHours);
router.get('/openStores', operationHours.findOpenRestaurants);

module.exports = router;