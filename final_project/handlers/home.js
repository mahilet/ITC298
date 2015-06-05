// home handlers
var db = require("../db");

module.exports = function(req, reply) {
	console.log(db);
  db.getAllblogUsers(function(err, blogs) {
    reply.view("bloglist", {
    	blogs : blogs, 
    	title: "Home"
    });
  });
};