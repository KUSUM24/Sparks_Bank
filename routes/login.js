const express = require("express");
const User = require("../models/Users");
const router = express.Router();
//Login
router.get("/login", (req, res) => {
  res.render("login");
});

//Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  let errors = [];
  if (!username || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (errors.length > 0) {
    res.render("login", {
      errors,
      username,
      password,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        if (user.password == password) {
          res.redirect(`/dashboard?id=${user.id}`);
        } else {
          errors.push({ msg: "Password is Invalid" });
          res.render("login", {
            errors,
            username,
            password,
          });
        }
      } else {
        errors.push({ msg: "Username is Invalid" });
        res.render("login", {
          errors,
          username,
          password,
        });
      }
    });
  }
});

//Logout
router.get("/logout", (req, res) => {
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});
module.exports = router;
