//index.js
var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
//require your custom 'push' into Array node
//works only while server is running
var posting= require("./posts");





server.connection({port:8000});
server.start();

// //----------requiring mysql------

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'mahitletdan.com',
//   user     : 'mahilet',
//   password : 'mahi-dani21'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

// //--------end my sql-------

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

//root folder at route localhost 8000

server.route({
  method:"GET",
  path: "/",
  handler: function(req, reply){
      reply.view("bloglist.html",{
           list: allJson
  });
}
});



// -------THIS IS WHAT BREAKS IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// fs.readFile("tempPosts.json", "utf8", function(err, data){
//   shortJson = JSON.parse(data).username;
// });



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

//I'm temporarily changing this path because I am not using grunt
       }
   }
});

