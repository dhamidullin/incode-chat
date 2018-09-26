var io = require("socket.io")();
var events = require("../events");
var { socket_auth } = require("../config");

events.on("added_chat_message", message => {
  io.emit("added_chat_message", message);
});

module.exports = io;
