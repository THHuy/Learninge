const mongoose = require("mongoose");
const point = require("../models/Point");
const dataPoint = mongoose.model("points", point);
class userController {
  //[GET] /user/point
  point(req, res, next) {
    var username = req.session.user;
    dataPoint
      .find({ username: username.username })
      .lean()
      .then((data) => {
        res.render("user/point", { data, username });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // [GET] /usser/point no data
  noPoint(req, res, next) {
    var username = req.session.user;
    res.render("user/point", { username });
  }
}
module.exports = new userController();
