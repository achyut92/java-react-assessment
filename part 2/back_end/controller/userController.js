var exports = module.exports = {}

var User = require("../models/user");

exports.fetchUserById = function(req, res){
    var responseStr = new (require('../util/responseStructure'))();
    var id = req.user._id
    User.findById(id).select('-password').exec(function(error, user){
        if(error){
            responseStr.result = {error:error}
        }else{
            responseStr.success = true
            responseStr.result = {user:user}
        }
        res.json(responseStr)
    } )
}

