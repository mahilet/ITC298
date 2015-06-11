//index.js

var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();

var db = require("./database");
server.connection({port:8000});



db.init(function(err) {
  console.log("Database ready, starting server...");
  if (err) {
    return console.error(err);
  }

  server.start(function() {
    console.log("Server ready!");
  });
});

// var allJson;
// db.getAllblogPosts(function (err, result) {
//   allJson = result;
// });




server.views({
  path: "views/templates",
  layoutPath: "views",
  layout: "default",
  engines: {
    html: require("handlebars")
  },
  isCached: false,
  context: {
    dev: true
  }
});



server.route(require("./routes"));
