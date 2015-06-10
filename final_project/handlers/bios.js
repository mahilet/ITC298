//handler for bios
var db = require("../database");


  var blogpeople;
  module.exports = function(req, reply) {
    db.getAllblogPosts(function (err, result) {
          reply.view("bios",{
            list:result

          });
    });
  }
