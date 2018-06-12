var exports = module.exports = {}

var jwtConf = require('../util/jwt');
var cryptoJs = require('../util/crypto');
var bCrypt = require('bcrypt-nodejs');
var User = require("../models/user");

exports.register = function (req, res) {
    var newUser = new User(req.body.user)
    var responseStr = new (require('../util/responseStructure'))();
    newUser.password = bCrypt.hashSync(newUser.password, bCrypt.genSaltSync(10), null);
    User.findOne({ email: newUser.email }, function (error, user) {
        if (error) {
            responseStr.result = error
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(responseStr))
        } else if (user) {
            responseStr.success = false
            responseStr.result = {error:'This Username is already taken'}
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(responseStr))
        } else {
            newUser.refresh_token = cryptoJs.cipher(newUser.email)
            newUser.save(function (error, user) {
                if (error) {
                    responseStr.result = error
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(responseStr))
                } else {
                    responseStr.success = true
                    responseStr.result = { success: true }
                    res.status(200).json(responseStr)
                }
            })
        }
    });
}

exports.login = function (req, res) {
    var userIn = req.body.user
    var responseStr = new (require('../util/responseStructure'))();

    User.findOne({ email: userIn.email }, function (error, user) {
        if (error) {
            responseStr.result = {error:error}
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(responseStr))
        } else if (!user) {
            responseStr.result = {error:'Username not found.'}
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(responseStr))
        } else {
            if (bCrypt.compareSync(userIn.password, user.password)) {
                responseStr.success = true
                responseStr.result = { token: jwtConf.sign(user) }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(responseStr))
            } else {
                responseStr.success = false
                responseStr.result = {error:'Wrong Password'}
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(responseStr))
            }
        }
    })
}

exports.loginRequired = function (req, res, next) {
    var responseStr = new (require('../util/responseStructure'))();
    if (req.user) {
        next();
    } else {
        responseStr.success = false
        responseStr.result = {error:'Unauthorized user!'}
        return res.json(responseStr);
    }
};