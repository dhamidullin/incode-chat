var jwt = require("express-jwt");
var socketioJwt = require("socketio-jwt");

var http_port = 8080;
var socket_port = 8081;

var db_uri = "mongodb://localhost:27017/sp-chat";

var server_secret = "G1zIDwcI01z18gILRtta0LjgIEFjp7zu";
var jwt_secret = "1NTMzxvwhx5MAJYMBpkgyXzsp8WmLeUi";

var authorization_handler = jwt({
  secret: jwt_secret,
  userProperty: "user",
  getToken: req => {
    return req.headers.authorization;
  }
});
/** no used yet */
var socket_authorization = socketioJwt.authorize({
  secret: jwt_secret,
  timeout: 5000
});

var cfg = {
  http_port,
  socket_port,
  db_uri,
  server_secret,
  jwt_secret,
  authorization_handler,
  socket_authorization
};

module.exports = cfg;
