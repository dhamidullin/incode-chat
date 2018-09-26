"use strict";

var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  owner_id: {
    type: String,
    index: true
  },
  text: {
    type: String,
    max: 256
  },
  date: { type: Number, default: Date.now }
});

mongoose.model("Message", MessageSchema);
