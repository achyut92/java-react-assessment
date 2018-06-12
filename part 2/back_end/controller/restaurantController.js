var exports = module.exports = {}

var Restaurant = require("../models/restaurant");

exports.fetchAllRestaurants = function (req, res) {

    Restaurant.find({}).exec(function (error, restaurants) {

        if (error) {
            res.json({ error: error })
        } else {
            res.json(restaurants)
        }
    })
}