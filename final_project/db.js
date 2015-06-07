var async = require("async");
var sqlite = require("sqlite3");
var db; // used across this module

var usersDb = {
  connection: null,
  init: function(ready) {
    db = new sqlite.Database("blogUsers.db", function(err) {
      if (err) {
        console.error("Couldn't open blogUsers database");
        process.exit(1);
      }

      //store the connection for outside modules to use directly
      usersDb.connection = db;
      // db.run("DELETE FROM blogposts");
       db.run("INSERT INTO users VALUES ('h', 'assets/images/mahilet.jpg', 'banana.com', '1');");

       // db.run("INSERT INTO blogposts VALUES ('DATE NOW!', 'NEW,NEW,NEW somehting, blahblah,  blahblah','assets/images/frog.png');");
       


      //create tables, and execute ready callback when done
      async.parallel([
        function(next) {
          db.run("CREATE TABLE IF NOT EXISTS users (username, bio, website, password);", function() {
            console.log("users TABLE is created");
             db.run("INSERT INTO users VALUES ('Mahilet', 'humanFemail', 'google.com', '1234');", function() {
               console.log("Mahilet is inserted into database");
             });
          }, next);
        },
        function(next) {
          db.run("CREATE TABLE IF NOT EXISTS blogposts (date, comment, topic);", function () {
            console.log("blogposts is created");
          }, next);
        }
      ], function(err, result) {
        console.log("done setting up db")
        if (ready) ready(err);
      });
    });
  },
  getAllblogUsers: function(c) {
    db.all("SELECT username, bio, website, rowid FROM users;", c);
  },
  getAllblogPosts: function(c) {
    db.all("SELECT * FROM blogposts;", c);
  },
  saveNewPost: function(namePost) {
    db.run("INSERT INTO blogposts (date, comment, topic) VALUES ($date, $comment, $topic);", {
      $topic: namePost.topic,
      $comment: namePost.comment,
      $date: Date.now()
    });
  },
  get: function(username, callback) {
    db.get("SELECT * FROM users WHERE username = $username", {
      $username : username
    }, callback);
  }
};

module.exports = usersDb;
