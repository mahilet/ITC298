//createpost handler
var db = require("../db");



var passwords;
db.getAllblogUsers(function (err, result) {
  passwords = result;
});


module.exports = function(req, reply){
      console.log(req.payload.user);
      console.log(passwords);

      var user = db.get(req.payload.user, function(err, result) {
        console.log(result, req.payload.password);
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