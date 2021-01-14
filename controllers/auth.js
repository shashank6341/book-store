const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session[1]);
  // const isLoggedIn = req.session;
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5ff70dc951e31c6778b1876b")
    .then((user) => {
      req.session.isLoggedIn = true;
      // 'user' is mongoose object here
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Session Destroy: ", err);
    }
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};
