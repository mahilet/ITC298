//index.js
var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
server.connection({port:8000});
server.start();



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
  path: "/list2",
  handler: function(req, reply){
    fs.readFile("package.json", "utf8", function(err, data){
      reply.view("list2.html",{
        name: "name",
       //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS
       list: JSON.parse(data).blogposts

      });
  });
}
});


server.route({
  method:"GET",
  path: "/",
  handler: function(req, reply){
    fs.readFile("package.json", "utf8", function(err, data){
      reply.view("list.html",{
        name: "name",
       //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS
       list: JSON.parse(data).blogposts

      });
  });
}
});


server.route ({
  method: "GET",
  path:"/createpost",
  handler:function(req,reply) {

    reply.view("createpost.html");
  }
});


server.route ({
  method:"GET",
   path:"/assets/{param*}",
   handler:{
       directory:{
       path:"src"
      //  I'm temporarily changing this path because I am not using grunt
       }

   }
});
