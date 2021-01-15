require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const User = require("../models/user");

// MARK : Mail Section

let transporter = nodemailer.createTransport({
  service: "Yahoo",
  secure: true,
  auth: {
    user: process.env.Email_From,
    pass: process.env.Email_password,
  },
});

let MailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: "Book Store",
    link: "http://localhost:3000/",
  },
});

// MARK : Methods Section
exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Email or Password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid Email or Password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email already exists.");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");

          let mail = MailGenerator.generate({
            body: {
              name: email,
              intro:
                "Welcome to Book-Store! We're very excited to have you on board.",
            },
          });

          return transporter.sendMail({
            from: process.env.Email_From,
            to: email,
            subject: "Signup Successful",
            html: mail,
          });
        })
        .then(() => {
          console.log('Mail Sent!');
        })
        .catch((error) => console.error(error));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
