var exports = module.exports = {}

var nodemailer = require('nodemailer');
var Collection = require('../models/collection');
var gmailCred = require('../util/gmailCred')
var socket = require('../bin/socket')

require('../models/restaurant')

exports.create = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    var id = req.user._id
    var collection = new Collection({
        name: req.body.collection_name,
        user_id: id
    })
    collection.save(function (error, collection) {
        if (error) {
            responseStr.result = { error: error }
        } else {
            responseStr.success = true
            responseStr.result = { collection: collection }
        }
        res.json(responseStr)
    })
}

exports.fetchCollectionByUser = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    var id = req.user._id
    Collection.find({ user_id: id }).exec(function (error, collections) {
        if (error) {
            responseStr.result = { error: error }
        } else {
            responseStr.success = true
            responseStr.result = { collections: collections }
        }
        res.json(responseStr)
    })
}

exports.addRestaurantToCollection = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    var id = req.user._id
    var coll_id = req.body.collection_id
    var res_id = req.body.restaurant_id
    var collection = new Collection({
        name: req.body.collection_name,
        user_id: id
    })
    Collection.update({ _id: coll_id }, { $push: { restaurants: res_id } }).then(collection => {
        responseStr.success = true
        responseStr.result = { collection: collection }
        res.json(responseStr)
    }).catch(error => {
        console.log(error);
        responseStr.result = { error: error }
        res.json(responseStr)
    })
}

exports.fetchCollectionById = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    // var id = req.user._id
    var collectionId = req.query.collectionId
    Collection.findById(collectionId).populate('restaurants').exec(function (error, collection) {
        if (error) {
            responseStr.result = { error: error }
        } else {
            responseStr.success = true
            responseStr.result = { collection: collection }
        }
        res.json(responseStr)
    })
}

exports.updateCollectionById = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    var collectionId = req.query.collectionId
    // var id = req.user._id
    var collection = req.body.collection
    var socketSessId = req.query.ioId
    Collection.findByIdAndUpdate(collectionId, collection).exec(function (error, collection) {
        if (error) {
            responseStr.result = { error: error }
        } else {
            responseStr.success = true
            responseStr.result = { collection: collection }
            if(socketSessId){
                socket.on
            }
        }
        res.json(responseStr)
    })
}

exports.sendEmail = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailCred.mail,
            pass: gmailCred.cred
        }
    });

    var mailOptions = {
        from: gmailCred.mail,
        to: req.body.to,
        subject: 'Sending Email using Node.js',
        text: 'Here is my collection: '+req.body.url
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            responseStr.result = {error:error}
            console.log(error);
        } else {
            
            responseStr.success = true 
            responseStr.result = {success:'Email sent: ' + info.response}
            console.log('Email sent: ' + info.response);
        }
        res.json(responseStr)
    });
}

exports.deleteCollectionById = function (req, res) {
    var responseStr = new (require('../util/responseStructure'))();
    var collectionId = req.query.collectionId
    Collection.findById(collectionId).remove().exec(function (error, collection) {
        if (error) {
            responseStr.result = { error: error }
        } else {
            responseStr.success = true
            responseStr.result = { collection: collection }
        }
        res.json(responseStr)
    })
}
