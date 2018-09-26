"use strict";

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var bluebird = require("bluebird");

var cfg = require("./config");

/** Database */
mongoose.Promise = bluebird;
mongoose
  .connect(
    cfg.db_uri,
    {
      useNewUrlParser: true,
      promiseLibrary: bluebird
    }
  )
  .then(() => {
    console.log("MongoDB connection succesful");
  })
  .catch(console.error);
require("./models/User");
require("./models/Message");

require("./passport");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(passport.initialize());

/* log all request */
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url}, \n ${
      req.method == "POST" || req.method == "PUT"
        ? ", " + JSON.stringify(req.body)
        : ""
    }`
  );

  next();
});

app.use("/api/authentication", require("./routes/authentication"));

module.exports = {
  app
};
