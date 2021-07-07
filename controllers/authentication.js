const authService = require("../services/authentication");

const HOME_URL = "/";
module.exports.getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
    res.json(500);
  }
};

module.exports.postLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body; // TODO: input validation
    const userData = await authService.findUser(userName, password);
    if (!userData) {
      res.redirect("/login");
    }
    req.session.isLoggedIn = true;
    req.session.userData = userData;
    req.session.save(function (err) {
      res.redirect(HOME_URL);
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports.postLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect(HOME_URL);
  } catch (error) {
    console.log(error);
    res.json(500);
  }
};
