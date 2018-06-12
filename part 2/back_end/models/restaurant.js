var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    /* opertaing_hours: {
        type: String
    } */
    "mon":{
        "open":{type:Number},
        "close":{type:Number},
    },
    "tue":{
        "open":{type:Number},
        "close":{type:Number},
    },
    "wed":{
        "open":{type:Number},
        "close":{type:Number},
    },
    "thur":{
        "open":{type:Number},
        "close":{type:Number},
    },
    "fri":{
        "open":{type:Number},
        "close":{type:Number},
    },
    "sat":{
        "open":{type:Number},
        "close":{type:Number},
    },
    "sun":{
        "open":{type:Number},
        "close":{type:Number},
    }
})

module.exports = mongoose.model('restaurants', RestaurantSchema, 'restaurants');