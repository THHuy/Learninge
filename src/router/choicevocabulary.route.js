const express = require("express");
const router = express.Router();
const choice = require('../app/controllers/ChoiceController')

router.get('/generalvocabulary', choice.gv)
router.get('/academicvocabulary', choice.av)

module.exports = router