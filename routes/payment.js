const express = require("express");
const User = require("../models/Users");
const router = express.Router();

router.get("/payment", (req, res) => {
  res.render("payment");
});

router.post("/payment", (req, res) => {
  let { pay, current, payUser } = req.body;
  current = JSON.parse(current);
  payUser = JSON.parse(payUser);
  let errors = [];
  if (current.username == payUser.username) {
    req.flash("error_msg", "Why would you pay to yourself?");
    res.redirect(`/dashboard?id=${current._id}`);
  } else {
    if (pay <= 0) {
      errors.push({ msg: "Please enter the amount > 0" });
      // req.flash("error_msg", "Please enter >0");
      res.render("payment", {
        errors,
        pay,
        current: JSON.stringify(current),
        payUser: JSON.stringify(payUser),
      });
    } else if (current.credits < pay) {
      errors.push({ msg: "Insufficient Balance" });
      res.render("payment", {
        errors,
        pay,
        current: JSON.stringify(current),
        payUser: JSON.stringify(payUser),
      });
    } else {
      User.findOneAndUpdate(
        { username: current.username },
        { $inc: { credits: -pay } }
      )
        .then((user) => {
          User.findOneAndUpdate(
            { username: payUser.username },
            { $inc: { credits: +pay } }
          ).then((user) => {
            errors.push({
              msg:
                "Payment Successful, you have been logged out due to security",
            });
            res.render("login", {
              errors,
            });
          });
        })
        .catch((err) => {
          errors.push({ msg: "Site under construction, try later" });
          res.render("payment", { errors });
        });
    }
  }
});
module.exports = router;
