var Post = require("../models/blogUsers");

module.exports = function(req, reply) {
  var payload = req.payload;
  var model = new Post(payload);
  model.save(function(err) {
    if (err) {
      console.error(err);
    }
    //reload data
    // var response = reply("Saved!");
   
    
    // response.headers.Location = "/";
     reply.redirect("/");
    console.log(model);
  });
};