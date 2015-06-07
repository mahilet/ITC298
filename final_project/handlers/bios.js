//handler for bios
var db = require("../db");



var blogpeople;
db.getAllblogUsers(function (err, result) {
  blogpeople = result;
});


module.exports = function(req,reply) {
	// console.log(blogpeople);
    reply.view("bios",{

      ImHandlebarsOnly: blogpeople

  });
    	
  };




















