var exports = module.exports = {}
const crypto = require('crypto');

exports.cipher = function(email) {
    const cipher = crypto.createCipher('aes-128-cbc', email);
    var mystr = cipher.update(email, 'utf8', 'hex')
    mystr += cipher.final('hex');
    return mystr
}

exports.decipher = function(email, cipher) {
    var mykey = crypto.createDecipher('aes-128-cbc', email);
    var mystr = mykey.update(cipher, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr
}