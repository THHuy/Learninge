const mongoose = require("mongoose");
const vocabulary = require("../models/Vocabulary");
const dataGv = mongoose.model("gv-topics", vocabulary);
const dataAv = mongoose.model("av-topics", vocabulary);
class ChoiceController{
    //[GET] /academicvocabulary
    av(req, res, next){
        dataAv.find({}).lean()
        .then(data => {
            res.render('choice/academicvocabulary', {data})
        })
        .catch(next)
    }
    //[GET] /generalvocabulars
    gv(req, res, next){
        dataGv.find({}).lean()
        .then(data => {
            res.render('choice/generalvocabulary', {data})
        })
        .catch(next)
    }
    
}

module.exports = new ChoiceController();