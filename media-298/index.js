var fs = require("fs");
var hapi = require("hapi");
var server = new hapi.Server();
server.connection({ port: 8000});
server.start();

server.views({
  path: "templates",
  engines: {
    html:require("handlebars")
  },
  isCached: false,
  layoutPath: "layouts",//llets it know that 'layouts folder exists'
  layout: "default"

});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply) {
    reply.view("index.html", {
      title: "home"
    });
  }
});
// this is the route for my movies page
server.route({
  method:"GET",
  path: "/movies",
  handler: function(req, reply){
    fs.readFile("media2.json", "utf8", function(err, data) {

      reply.view("movies.html", {
        title: "movies",
        //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS
        movies: JSON.parse(data).media.movies
      });
    });
  }
});

// this is the route for my books page
server.route({
  method: "GET",
  path: "/books",
  handler: function(req, reply){
    fs.readFile("media2.json", "utf8", function(err, data) {

      reply.view("books.html", {
        title: "books",
        //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS
        books: JSON.parse(data).books
      });
    });
  }
  });


// this is the route for my tv shows
server.route({
  method: "GET",
  path: "/tvshows",
  handler: function(req, reply){
    fs.readFile("media2.json", "utf8", function(err, data) {

      reply.view("tvshows.html", {
        title: "tvshows",
        //BELOW IS PROPERTY THAT COMMUNTICATES WITH THE 'SECTION' IN HANDLEBARS
        tvshows: JSON.parse(data).media.tvshows
      });
    });
  }
  });


server.route({
  method:"GET",
  path:"/assets/{param*}",
  //configuration object here instead of a function
  handler:{
    directory: {
      path: "public"
    }
  }
});
