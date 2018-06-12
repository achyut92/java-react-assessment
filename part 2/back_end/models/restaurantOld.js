var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    restaurant_name: {
        type: String,
    },
    opertaing_hours: {
        type: String
    }
})

module.exports = mongoose.model('restaurants2', RestaurantSchema, 'restaurants2');