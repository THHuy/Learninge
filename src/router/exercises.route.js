const express = require("express");
const router = express.Router();
// khai bao controller 
const exercisesController = require('../app/controllers/ExercisesController');


router.post('/point', exercisesController.uploadPoint);
router.get('/', exercisesController.index)



module.exports = router