var hapi = require("hapi");
var fs = require("fs");
var server = new hapi.Server();
server.connection({port: 8000});
server.start();

server.views({
    path: "templates",
    engines: {
        html:require("handlebars")
    },
    layoutPath: "layouts",
    layout: "default"
});
//
// server.route({
//     method: "GET",
//     path: "/",
//     handler: function(req, reply) {
//        reply.view("index", {
//         title: "Home"
//        });
//     }
//
// });


var JsonMovies;
fs.readFile("media.json", "utf8", function(err, data) {
    JsonMovies = JSON.parse(data).movies;
});

//fs.readFile(file, [encoding], [callback]);
server.route({
    method: "GET",
    path: "/",
    handler: function(req, reply) {
        reply.view("movies", {//this is movies.html
            title: "Movies",
            movies: JsonMovies
        });
    }
});


server.route({
    method: "GET",
    path: "/movie/{index}",
     handler: function(req, reply) {
        var movie = JsonMovies[req.params.index];


        reply.view("movie", {//this is movie.html
            title: movie.title,
            times: movie.times
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
