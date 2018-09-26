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

var io = require("./chat-engine");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(passport.initialize());

/* LOG ALL REQUESTS */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  next();
});

app.use("/api/authentication", require("./routes/authentication"));
app.use("/api/chat", require("./routes/chat"));

app.get("*", (req, res, next) => {
  if (res.statusCode == 200) {
    res.sendFile(__dirname + "/build/index.html");
  }
});

module.exports = {
  app,
  io
};
