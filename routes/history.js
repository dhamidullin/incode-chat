"use strict";

var express = require("express");
var router = express.Router();
var { authorization_handler } = require("../config");
var mongoose = require("mongoose");

var Message = mongoose.model("Message");

router.get("/", authorization_handler, (req, res, next) => {
  let conditions = {};

  let { name, text, count, sort, dateStart, dateEnd } = req.query;

  if (name) conditions.owner_username = { $in: new RegExp(name, 'i') };
  if (text) conditions.text = { $in: new RegExp(text, 'i') };

  conditions.date = { $gt: 0 };
  if (new Date(dateStart).getTime())
    conditions.date["$gt"] = new Date(dateStart).getTime();
  if (new Date(dateEnd).getTime())
    conditions.date["$lt"] = new Date(dateEnd).getTime();

  count = +count;
  if (count < 1) count = 1;
  if (count > 100) count = 100;

  switch (sort) {
    case "old":
      sort = { date: 1 };
      break;
    case "new":
      sort = { date: -1 };
      break;
    case "a":
      sort = { owner_username: 1 };
      break;
    case "z":
      sort = { owner_username: -1 };
      break;
    default:
      sort = { date: -1 };
      break;
  }

  Message.find(conditions)
    .limit(count)
    .sort(sort)
    .then(messages => {
      res.json({ messages });
    })
    .catch(err => {
      res.status(500).end();
      console.log(err);
    });
});

module.exports = router;
