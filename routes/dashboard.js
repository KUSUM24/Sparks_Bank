const express = require("express");
const User = require("../models/Users");
const router = express.Router();

//dashboard
router.get("/dashboard", (req, res) => {
  // if(!req.query.id)
  User.findOne({ _id: req.query.id }).then((user) => {
    if (user) {
      User.find().then((result) => {
        res.render("dashboard", {
          user: JSON.stringify(user),
          result: JSON.stringify(result),
        });
      });
    }
  });
});

module.exports = router;
