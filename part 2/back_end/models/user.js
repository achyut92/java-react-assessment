var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
    {
        user_name: {
            type: String
        },
        email:{
            type: String
        },
        password: {
            type: String
        },refresh_token: {
            type: String
        }
    })


module.exports = mongoose.model('users', UserSchema, 'users');
