//index.js
var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
//require your custom 'push' into Array node
var posting= require("./posts");

server.connection({port:8000});
server.start();

var allJson;

fs.readFile("package.json", "utf8", function(err, data){
  allJson = JSON.parse(data).blogposts;
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

       //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS
       list: allJson
  });
}
});


var shortJson;

// fs.readFile("tempPosts.json", "utf8", function(err, data){
//   shortJson = JSON.parse(data).tempPosts;
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

    var namePost;
    var namePost = JSON.stringify(req.payload, null, 6);

    console.log(namePost);
    reply.view("createpost.html", {
      shorts:shortJson
      // blogs: posting.tempPostLists
    },

    fs.appendFile('tempPosts.json', namePost, 'utf8', function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    })
    );
  }
});

//  this is a list of users biographies
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
       //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS

     });

}
});


//this is where are pictures and css

server.route ({
  method:"GET",
   path:"/assets/{param*}",
   handler:{
       directory:{
       path:"/src"

      //  I'm temporarily changing this path because I am not using grunt
       }
   }
});
