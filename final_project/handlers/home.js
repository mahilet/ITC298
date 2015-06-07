// home handlers
var db = require("../db");

// var BlogUsers = require("../models/BlogUsers");



module.exports = function(req, reply) {
	
var blogposts;

db.getAllblogPosts(function (err, result) {
  blogposts = result;
});

	console.log(db);
  db.getAllblogPosts(function(err, blogs) {
    reply.view("bloglist", {
    	blogs : blogposts
    	
    	
    });
  });
};