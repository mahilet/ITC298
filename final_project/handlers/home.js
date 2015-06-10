// home handlers
var db = require("../database");

// var BlogUsers = require("../models/BlogUsers");


module.exports = function(req, reply) {

		db.getAllblogPosts(function (err, result) {
			reply.view("bloglist", {
				blogs: result
			});
	});
}
