var { app, io } = require("../app");
var { http_port, socket_port } = require("../config");

var server = app.listen(http_port, function() {
  console.log("Express server listening on port " + server.address().port);
});

io.listen(socket_port);
