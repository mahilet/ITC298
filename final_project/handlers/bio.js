//createpost handler
var db = require("../database");

var blogpeople;
module.exports = function(req, reply) {
  db.getAllblogUsers(function (err, result) {

        reply.view("bio",{
          handlebars:result

        });
  });
}
