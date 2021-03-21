const express = require("express");
const User = require("./../models/Users");
const router = express.Router();

router.get("/history", (req, res) => {
  res.render("history");
});

module.exports = router;
