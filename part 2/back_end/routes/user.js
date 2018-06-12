var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
var authController = require('../controller/authController')

router.get('/fetchUserById', authController.loginRequired, userController.fetchUserById )

module.exports = router;
