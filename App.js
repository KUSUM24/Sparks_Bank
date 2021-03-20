var express = require("express");
var app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const dbURI =
  "mongodb+srv://sparks:sparks123@cluster0.1sftl.mongodb.net/SparksDB?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connect");
    app.listen(3003, () => {
      console.log("running on 3003");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use("/assets", express.static("design")); // css
app.use(express.static(__dirname)); // for images do this

//BpdyParser
app.use(express.urlencoded({ extended: false }));

//Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//routes
app.use("/", require("./routes/login"));
app.use("/", require("./routes/signup"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/payment"));
app.use("/", require("./routes/profile"));
