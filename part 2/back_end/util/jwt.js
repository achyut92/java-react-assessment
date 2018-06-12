var jwt = require('jsonwebtoken');
const cryptoJs = require('./crypto');
var User = require("../models/user");

const conf = {
    option: {
        algorithm: 'HS256',
        expiresIn: '1h'
    },
    secret: 'secret_enter',
}

function sign(user) {
    if (user.email) {
        return jwt.sign({ email: user.email, _id: user._id }, cryptoJs.cipher(user.email + this.conf.secret), this.conf.option)
    }
}

function refreshToken(email, callback) {
    var sec = conf.secret
    var opt = conf.option
    User.findOne({email: email}, function (error, user) {
        if (user.email) {
            if (user.email == cryptoJs.decipher(email, user.refresh_token)) {
                jwt.sign({ email: user.email, _id: user._id}, cryptoJs.cipher(user.email + sec), opt)
            }
            userRefreshed = {
                email: user.email, _id: user._id
            }
            callback(error, userRefreshed);
        }
    })
}

function verify(authHeader, callback) {
    var sec = this.conf.secret
    var opt = this.conf.option
    var email = jwt.decode(authHeader).email
    jwt.verify(authHeader, cryptoJs.cipher(email + sec), opt, function (error, decode) {
        if (error) {
            if (error.name == 'TokenExpiredError') {
                refreshToken(email, function (error, user) {
                    if (user) {
                        callback(null, user)
                    } else {
                        callback(error, null)
                    }
                })
            } else {
                callback(error, null)
            }
        } else {
            callback(null, decode)
        }
    })
}

module.exports = {
    conf: conf,
    sign: sign,
    verify: verify
}