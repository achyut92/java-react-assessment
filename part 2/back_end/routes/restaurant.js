var express = require('express');
var router = express.Router();
var restaurantController = require('../controller/restaurantController')

router.get('/fetchAllRestaurants', restaurantController.fetchAllRestaurants);

module.exports = router;
