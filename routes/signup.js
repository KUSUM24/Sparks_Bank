const express = require("express");
const User = require("../models/Users");
const router = express.Router();

//for Main
router.get("/", (req, res) => {
  res.render("signup");
});

//for Signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

//Signup Handle
router.post("/signup", (req, res) => {
  const { name, username, email, account, password } = req.body;
  let errors = [];
  //Required fields
  if (!name || !username || !email || !account || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      username,
      email,
      account,
      password,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username is already taken" });
        res.render("signup", {
          errors,
          name,
          username,
          email,
          account,
          password,
        });
      } else {
        User.findOne({ account: account }).then((user) => {
          if (user) {
            errors.push({ msg: "Account is already taken" });
            res.render("signup", {
              errors,
              name,
              username,
              email,
              account,
              password,
            });
          } else {
            User.findOne({ email: email }).then((user) => {
              if (user) {
                errors.push({ msg: "Email is already taken" });
                res.render("signup", {
                  errors,
                  name,
                  username,
                  email,
                  account,
                  password,
                });
              } else {
                const newUser = new User({
                  name,
                  username,
                  email,
                  account,
                  password,
                  credits: 10000,
                });
                newUser
                  .save()
                  .then((user) => {
                    req.flash(
                      "success_msg",
                      "You just Signed Up, try Logging in"
                    );

                    res.redirect("/login");
                  })
                  .catch((err) => console.log(err));
              }
            });
          }
        });
      }
    });
  }
});
module.exports = router;
