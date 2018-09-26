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

  message.text = req.body.text;
  message.owner_id = req.user.owner_id;

  message.save((err, newMessage) => {
    if (!err) {
      let payload = {
        /** this is complete information of message */
        _id: newMessage._id,
        username: req.user.username,
        text: newMessage.text,
        date: newMessage.date
      };

      events.emit("added_chat_message", payload);
      res.end();

      last.push(payload);
      if (last.length > max) {
        last = last.slice(last.length - max);
      }
    }
    res.status(500).end();
  });
});

router.get("/last", (req, res, end) => {
  res.json({ last });
});

module.exports = router;
