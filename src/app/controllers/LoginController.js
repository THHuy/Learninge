const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const login = require("../models/Login");
const point = require("../models/Point");
const dataLogin = mongoose.model("users", login);
const dataPoint = mongoose.model("points", point);
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
class LoginController {
  //[GET] /
  index(req, res, next) {
    res.render("login");
  }
  //[POST] /login
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const data = await dataLogin.findOne({ username, password });
      if (data) {
        req.session.user = data; // Lưu thông tin người dùng vào session
        res.redirect("/home"); // Chuyển hướng đến trang dashboard sau khi đăng nhập
      } else {
        res.redirect("/"); // Chuyển hướng lại trang đăng nhập nếu đăng nhập không thành công
      }
    } catch (error) {
      next(error); // Chuyển lỗi đến middleware xử lý lỗi tiếp theo
    }
  }
  //[GET] /register
  register(req, res, next) {
    res.render("register");
  }
  //[POST] /create
  create(req, res, next) {
    console.log(req.body);
    dataLogin
      .findOne({ username: req.body.username })
      .then((data) => {
        if (data) {
          res.json("Tài khoản đã tồn tại");
        } else {
          return dataLogin.create({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
          });
        }
      })
      .then((data) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //[GET] /logout
  logout(req, res, next) {
    req.session.destroy(); // Hủy bỏ session để đăng xuất người dùng
    res.redirect("/");
  }
  //[GET] /profile
  profile(req, res, next) {
    var user = req.session.user;
    dataLogin
      .findOne({ _id: req.params.id })
      .lean()
      .then((data) => {
        dataPoint
          .findOne({ username: data.username })
          .lean()
          .then((dataPoint) => {
            res.render("profile/profile", { data, user, dataPoint });
          });
      });
  }

  //[GET] /edit/:id
  edit(req, res, next) {
    dataLogin
      .findById(req.params.id)
      .then((data) => {
        res.render("profile/edit", { data: mongooseToObject(data) });
      })
      .catch(next);
  }
  // [PUT] /:id
  update(req, res, next) {
    dataLogin
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect(`/profile/${req.params.id}`))
      .catch(next);
  }
}

module.exports = new LoginController();
