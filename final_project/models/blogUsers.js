var Backbone = require("backbone");
var db = require("../db");


var LOAD = "SELECT  username, bio, website FROM users WHERE rowid = $id;";
// var SAVE_NEW = "INSERT INTO users (username, bio, website) VALUES ($username, $bio, $website);";
var SAVE_NEW = "INSERT INTO blogposts (date, topic, comment) VALUES ($date, $topic, $comment);";
var UPDATE = "UPDATE users SET username = $username, bio = $bio, website = $website WHERE rowid = $id;";
var LAST = "SELECT last_insert_rowid() AS rowid FROM users;";

// var BlogUser = Backbone.Model.extend({
//   defaults: {
//     username: "Unamed Human",
//     bio: "",
//     website: "",
//     id: "new"
//   },
  var BlogUser = Backbone.Model.extend({
  defaults: {
    date: "Unamed Human",
    topic: "",
    comment: "",
    id: "new"
  },



  

  // whe done, call the callback
  load: function(done) {
    var self = this;
    // run an INSERT on the database
    var query = db.connection.prepare(LOAD);
     // get its own data
    var data = this.toJSON();
    query.get({
      $id: data.id
    }, function(err, loaded) {
      self.set(loaded);
      done(err);
    });
  },
  // save: function(done) {
  //   var self = this;
  //   var id = this.get("id");
  //   var q = id == "new" ? SAVE_NEW : UPDATE;
  //     // pass in its data
  //   var query = db.connection.prepare(q);

  //   var data = this.toJSON();

  //   query.run({
  //     $username: data.username,
  //     $bio: data.bio,
  //     $website: data.website,
  //     $id: id == "new" ? undefined : data.id
  //     // $formatted: moment().format("dddd MMMM do, YYYY"),
  //     // rowid = $id
  //   }, done);
  // }
    save: function(done) {
    var self = this;
    var id = this.get("id");
    var q = id == "new" ? SAVE_NEW : UPDATE;
      // pass in its data
    var query = db.connection.prepare(q);

    var data = this.toJSON();

    query.run({
      $date: data.date,
      $topic: data.topic,
      $comment: data.comment,
      $id: id == "new" ? undefined : data.id
      // $formatted: moment().format("dddd MMMM do, YYYY"),
      // rowid = $id
    }, done);
  }
});



module.exports = BlogUser;