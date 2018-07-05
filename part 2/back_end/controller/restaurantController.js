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

exports.searchRestaurants = function (req, res) {
    const days = ['sun','mon','tue','wed','thur','fri','sat']
    var day = days[Number(req.query.day)]
    var time = Number(req.query.time)

    var condition = {
    }
    condition['opertaing_hours.'+day+'.open'] = {$lte:time}
    condition['opertaing_hours.'+day+'.close'] = {$gte:time}
    Restaurant.find({$and: [condition]}).exec(function (error, restaurants) {

        if (error) {
            res.json({ error: error })
        } else {
            res.json(restaurants)
        }
    })
}