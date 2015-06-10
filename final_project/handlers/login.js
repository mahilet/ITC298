//createpost handler
var db = require("../database");




module.exports = function(req, reply){
      console.log(req.payload.user);

      var user = db.get(req.payload.user, function(err, result) {
        console.log(err, result, req.payload.password);
        if(result && req.payload.password == result.password) {
          var response = reply.view("bloglist.html");
        } else {
          reply.view("/login", {
            error: "Invalid Login",
            username: req.payload.user,
            password: req.payload.password
          });
        }
      });
    }
