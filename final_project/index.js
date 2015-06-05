//index.js

var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
//require your custom 'push' into Array node
//works only while server is running
var posting= require("./posts");
var sqlite = require("sqlite3");

server.connection({port:8000});


//------------ADDING SQLITE3------------------------

var db = require("./db");
db.init(function(err) {
  console.log("returned");
  if (err) {
    return console.error(err);
  }
  console.log("Database ready, starting server...");
  server.start(function() {
    console.log("Server ready!");
  });
});
/*var db = new sqlite.Database("database.db", function(){

db.run("CREATE TABLE IF NOT EXISTS users (name, comment)", function(){

db.run("INSERT INTO users VALUES ('Mahilet' , 'blah,blah,blah')");

db.get("SELECT * FROM users", function(err,result){
console.log(result);
});

db.all("SELECT * FROM users", function(err,results){
console.log(results);
});
});
db.run("CREATE TABLE IF NOT EXISTS auth (username, password)", function(){

db.run("INSERT INTO auth VALUES ('h', '1')");

db.get("SELECT * FROM auth", function(err,result){
console.log(result);
});
});
});*/

//------------END ADDING SQLITE3------------------------
var allJson;
db.getAllblogPosts(function (err, result) {
  allJson = result;
});
/*fs.readFile("tempPosts.json", "utf8", function(err, data){
allJson = JSON.parse(data);
});*/


server.views({
  path: "templates",
  engines: {
    html:require("handlebars")
  },
  isCached: false,
  layoutPath: "layouts",
  layout: "default",
  context: {
    dev: true
  }

});

server.route(require("./routes"));
