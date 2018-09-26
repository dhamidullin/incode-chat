"use strict";

var express = require("express");
var router = express.Router();
var { authorization_handler } = require("../config");
var mongoose = require("mongoose");

var events = require("../events");

var Message = mongoose.model("Message");

var last = [];
var max = 15;

router.put("/message", authorization_handler, function(req, res, next) {
  if (!req.body.text || typeof req.body.text !== "string") {
    return res.status(400).end();
  }

  let message = new Message();

  message.owner_id = req.user._id;
  message.owner_username = req.user.username;
  message.text = req.body.text;

  message.save((err, newMessage) => {
    if (!err) {
      events.emit("added_chat_message", newMessage);
      res.end();

      last.push(newMessage);
      if (last.length > max) {
        last = last.slice(last.length - max);
      }
    } else {
      res.status(500).end();
    }
  });
});

router.get("/last", (req, res, end) => {
  res.json({ last });
});

module.exports = router;
