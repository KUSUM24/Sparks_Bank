const express = require("express");
const User = require("./../models/Users");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.post("/profile", (req, res) => {
  let { usernamePro } = req.body;
  usernamePro = JSON.parse(usernamePro);
  User.findOne({ username: usernamePro.username }).then((user) => {
    if (user) {
      res.redirect(`/dashboard?id=${usernamePro._id}`);
    }
  });
});
module.exports = router;
