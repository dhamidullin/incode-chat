"use strict";

var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  owner_id: {
    type: String,
    index: true
  },
  owner_username: String,
  text: {
    type: String,
    maxlength: 300
  },
  date: { type: Number, default: Date.now }
});

mongoose.model("Message", MessageSchema);
