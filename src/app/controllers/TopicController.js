const mongoose = require("mongoose");
const vocabulary = require("../models/Vocabulary");
const dataGv = mongoose.model("gv-topics", vocabulary);
const dataAv = mongoose.model("av-topics", vocabulary);
class TopicController {
  gv(req, res, next) {
    dataGv
      .find({brief: req.params.slug})
      .lean()
      .then((data) => {
        res.render('topic/topic',{data})

      })
      .catch(next);
  } 
  av(req, res, next) {
    dataAv
      .find({brief: req.params.slug})
      .lean()
      .then((data) => {
        res.render('topic/topic',{data})
      })
      .catch(next);
  } 
}

module.exports = new TopicController();
