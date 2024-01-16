const express = require("express");
const router = express.Router();
const userController = require('../app/controllers/UserController');
const { route } = require("./login.router");



router.get('/point', userController.noPoint)
router.get('/point/:id', userController.point)


module.exports = router