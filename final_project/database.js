var async = require("async");
var sqlite = require("sqlite3");
var db; // used across this module

var usersDb = {
  connection: null,
  init: function(ready) {
    var db = usersDb.connection = new sqlite.Database("database.db", function(err) {

      if (err) {
        console.error("Database not opened");
        process.exit(1);
      }


      //create tables, and execute ready callback when done
      async.parallel([
        function(next) {
          console.log("creating user database", db);
          db.run("CREATE TABLE IF NOT EXISTS users (username, bio, website, password);", function(err) {
            console.log(err, "users TABLE is created");
             db.run("INSERT INTO users VALUES ('Mahilet', 'humanFemail', 'google.com', '1234');", function(err) {
               console.log(err, "Mahilet is inserted into database");
               db.run("INSERT INTO users VALUES ('h', 'assets/images/mahilet.jpg', 'banana.com', '1');", next);
             });
          });
        },
        function(next) {
          // db.run("DELETE FROM blogposts");
          db.run("CREATE TABLE IF NOT EXISTS blogposts (date, comment, topic);", function () {
            console.log("blogposts is created");

          }, next);
        }
      ], function(err, result) {
        console.log(err);
        console.log("done setting up db")
        if (ready) ready(err);
      });
    });
  },
  getAllblogUsers: function(c) {
    this.connection.all("SELECT username, bio, website, rowid, password FROM users;", c);
  },
  getAllblogPosts: function(c) {
    this.connection.all("SELECT * FROM blogposts;", c);
  },
  saveNewPost: function(namePost) {
    this.connection.run("INSERT INTO blogposts (date, comment, topic) VALUES ($date, $comment, $topic);", {
      $topic: namePost.topic,
      $comment: namePost.comment,
      $date: Date.now()
    });
  },
  get: function(username, callback) {
    this.connection.get("SELECT * FROM users WHERE username = $username", {
      $username : username
    }, callback);
  }
};

module.exports = usersDb;
