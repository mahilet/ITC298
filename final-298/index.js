
var hapi = require("hapi");
var fs = require("fs");

//this is custom function to push 'submitted' recipes into recipeList[]
var addRecipe = require("./recipes");
//var orders = require("./orders");


var server = new hapi.Server();
server.connection({ port:8000 });
server.start();

//GLOBAL PROPERTIES

server.views({
  path: "templates",
  engines: {
    html:require("handlebars")
  },
  isCached: false,
  layoutPath: "layouts",
  layout:"default"


});




//SPECIFIC PAGE REQUESTS
server.route({
  method: "GET",
  path:"/",
   handler: function(req, reply) {
     reply.view("index.html",{

       title:"Home"
     });
   }
});
// page where the user will make a recipe
server.route({
  method: "GET",
  path:"/createform",
   handler: function(req, reply) {
     reply.view("createform",{

       title:"createform"
     });
   }
});

//this is where a single reciped will be summited after a user make it
server.route({
  method:"POST",
  path: "/recipe",
  handler: function(req, reply) {
    console.log(req.payload);
    var recipe = req.payload;
    addRecipe.add(req.payload);

    reply.view("recipe", {
      submissions: addRecipe.recipes
    });
  }
});
// page that lists all recipes with a small amount of detail

server.route({
  method: "GET",
  path:"/assets/{param*}",
   handler:{
       directory: {
         path: "public"
       }
   }
});
