class homeController {
  //[GET] /home
  index(req, res, next) {
    var username = req.session;
    res.render("home", { username });
  }

  //[GET] /academicvocabulary
  av(req, res, next) {
    res.redirect("/choice/academicvocabulary");
  }
  //[GET] /generalvocabular
  gv(req, res, next) {
    res.redirect("/choice/generalvocabulary");
  }
}

module.exports = new homeController();
