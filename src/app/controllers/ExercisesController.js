const mongoose = require("mongoose");
const vocabulary = require("../models/Vocabulary");
const point = require("../models/Point");
const dataGv = mongoose.model("gv-topics", vocabulary);
const dataAv = mongoose.model("av-topics", vocabulary);
const dataPoint = mongoose.model("points", point);

class exercisesController {
  //[GET] exercise/?id =
  index(req, res, next) {
    const idstart = req.query.idstart;
    if (idstart < 112) {
      dataGv
        .findOne({ "exercises.id": req.query.id }, { "exercises.$": 1 })
        .lean()
        .then((data) => {
          res.render("exercises/exercises", { data });
        })
        .catch(next);
    } else {
      dataAv
        .findOne({ "exercises.id": req.query.id }, { "exercises.$": 1 })
        .lean()
        .then((data) => {
          res.render("exercises/exercises", { data });
        })
        .catch(next);
    }
  }
  // [POST] /exercises/uploadPoint
  uploadPoint(req, res, next) {
    var username = req.session.user;
    dataPoint
      .create({
        username: username.username,
        title: req.query.name,
        group: req.query.group,
        ex: req.query.ex,
        point: req.query.point,
      })
      .then((data) => {
        res.redirect("back");
      })
      .catch((next) => {
        console.log(next);
      });
  }
}
module.exports = new exercisesController();
