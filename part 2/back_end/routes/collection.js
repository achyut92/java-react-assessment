var express = require('express');
var router = express.Router();
var collController = require('../controller/collectionController')
var authController = require('../controller/authController')

router.post('/create', authController.loginRequired, collController.create )

router.get('/fetchCollectionByUser', authController.loginRequired, collController.fetchCollectionByUser)

router.post('/addRestaurantToCollection', authController.loginRequired, collController.addRestaurantToCollection)

router.get('/fetchCollectionById', /* authController.loginRequired, */ collController.fetchCollectionById)

router.post('/updateCollectionById', /* authController.loginRequired, */ collController.updateCollectionById)

router.post('/deleteCollectionById', /* authController.loginRequired, */ collController.deleteCollectionById)

router.post('/sendEmail', /* authController.loginRequired, */ collController.sendEmail)

module.exports = router;
