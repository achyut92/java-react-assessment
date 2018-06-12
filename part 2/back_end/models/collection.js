var mongoose = require('mongoose');

var CollectionSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        user_id: {
            type: String
        },
        restaurants: [{
            type: mongoose.Schema.ObjectId,
            ref: 'restaurants'
        }]
    })


module.exports = mongoose.model('collections', CollectionSchema, 'collections');
