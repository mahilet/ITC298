//createpost handler


var blogUsers = require("../models/blogUsers");

module.exports = function(req, reply) {
  var id = req.params.id;
  var model = new blogUsers({
    id: id
  });
  //new projects don't need to load from the DB
  if (id == "new") {
    return reply.view("createpost", {
      title: "New blogUsers",
      project: model.toJSON()
    });
  }
  //get model details and then return the page
  model.set("id", id);
  model.load(function(err) {
    var data;
    if (err) {
      console.log(err);
      
    } else {
      data = model.toJSON();
    }
    reply.view("createpost", {
      title: data.username,
      project: data
    });
  });
};