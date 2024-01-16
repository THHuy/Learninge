const express = require("express");
const router = express.Router();
// khai bao controller 
const topicController = require('../app/controllers/TopicController')




router.get('/generalvocabulary/:slug', topicController.gv)
router.get('/academicvocabulary/:slug', topicController.av)



module.exports = router