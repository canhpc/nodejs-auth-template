module.exports = (req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.userData = req.session.userData;
  next();
};
