//index.js

var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
//require your custom 'push' into Array node
//works only while server is running
var posting= require("./posts");
var sqlite = require("sqlite3");


server.connection({port:8000});
server.start();

//------------ADDING SQLITE3------------------------

var db = new sqlite.Database("database.db", function(){

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
});

//------------END ADDING SQLITE3------------------------

var allJson;
fs.readFile("tempPosts.json", "utf8", function(err, data){
  allJson = JSON.parse(data);
});


server.views({
  path: "templates",
  engines: {
    html:require("handlebars")
  },
  isCached: false,
  layoutPath: "layouts",
  layout: "default"

});

server.route({
  method:"GET",
  path: "/",
  handler: function(req, reply){
    reply.view("login");
  }
});


//-------------------TEMP LOGIN SERVER ROUTES--------
server.route({
  method:"GET",
  path: "/login",
  handler: function(req, reply){
    reply.view("login");
  }
});

//THIS BELOW IS TEMPORARY it should be a db
var fusers = {
  h: "1",
  mah:"12",
  dere:"12",
  admin:"admin"
};

server.route({
  method:"POST",
  path:"/login",
  handler:function(req, reply){
    console.log(req.payload.user);

    var user = db.get("SELECT * FROM auth WHERE username = $username", {
      $username : req.payload.user
    }, function(err, result) {
      console.log(this, result, req.payload.password);
      if(req.payload.password == result.password) {
        var response = reply.view("bloglist.html");
      } else {
        reply.view("/login", {
          error: "Invalid Login",
          username: req.payload.user,
          password: req.payload.password
        });
      }
    });

  }
});

//-------------------END TEMP LOGIN SERVER ROUTES--------


// -----HIS IS WHERE I go to ----------------

server.route ({
  method: "GET",
  path:"/createpost",
  handler:function(req,reply) {
    reply.view("createpost.html",{

    });
  }
});

// -----HIS IS WHERE I STARRT TO SAVE DATA TO JSON-----------------

server.route ({
  method: "POST",
  path:"/createpost",
  handler:function(req,reply) {

    var namePost = req.payload;
    console.log(namePost);
    reply.view("bloglist.html",{
      list: allJson


      // blogs: posting.tempPostLists
    })

    allJson.push(namePost);

    fs.writeFile('tempPosts.json', JSON.stringify(allJson), function (err) {
      if (err) throw err;
      console.log('The ' + namePost );
    });
  }
});

//  this is a list of   users biographies
server.route ({
  method: "GET",
  path:"/bios",
  handler:function(req,reply) {
    reply.view("bios.html",{
      userlist: allJson

    });
  }
});



//This page can view single bio of user
//this page uses JSON

var thisObject;

server.route({
  method:"GET",
  path: "/bios/bio/{index}",
  handler: function(req, reply){
    var thisObject = allJson[req.params.index];
    reply.view("bio.html",{
      icon: thisObject.icon,
      website: thisObject.mywebsite,
      pic: thisObject.pic,
      bio: thisObject.bio,
      name: thisObject.username

    });

  }
});


//this is where are pictures and css

server.route ({
  method:"GET",
  path:"/assets/{param*}",
  handler:{
    directory:{
      path:"src"


    }
  }
});
