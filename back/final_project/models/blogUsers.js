var Backbone = require("backbone");
var db = require("../database");


var LOAD = "SELECT  username, bio, website,password FROM users WHERE rowid = $id;";
var SAVE_NEW = "INSERT INTO users (username, bio, website, password) VALUES ($username, $bio, $website, $password);";
var UPDATE = "UPDATE users SET username = $username, bio = $bio, website = $website, password =$password WHERE rowid = $id;";
var LAST = "SELECT last_insert_rowid() AS rowid FROM users;";


  var BlogUser = Backbone.Model.extend({
  defaults: {
    username: "Unamed Human",
    bio: "",
    website: "",
    password: "",
    id: "new"
  },





  // whe done, call the callback
  load: function(done) {
    var self = this;
    // run an INSERT on the database
    var query = db.connection.prepare(LOAD);
     // get its own data
    var username = this.toJSON();
    query.get({
      $id: username.id
    }, function(err, loaded) {
      self.set(loaded);
      done(err);
    });
  },

    query.run({
      $username: data.username,
      $bio: data.bio,
      $website: data.website,
      $password:date.password,
      $id: id == "new" ? undefined : data.id

    }, done);
  }

  }
});



module.exports = BlogUser;
