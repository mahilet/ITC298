//createpost handler
var db = require("../db");

var blogpeople;
db.getAllblogUsers(function (err, result) {
  blogpeople = result;
});


module.exports =  function(req, reply){

    reply.view("bio.html",{
    	handlebars:blogpeople
     

    });

  }