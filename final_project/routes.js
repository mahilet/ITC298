module.exports = [
  {
    method:"GET",
    path: "/",
    handler: function(req, reply){
      reply.view("login");
    }
  },


  //-------------------TEMP LOGIN SERVER ROUTES--------
  {
    method:"GET",
    path: "/login",
    handler: function(req, reply){
      reply.view("login");
    }
  },

  {
    method:"POST",
    path:"/login",
    handler:function(req, reply){
      console.log(req.payload.user);

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
  },

  //-------------------END TEMP LOGIN SERVER ROUTES--------


  // -----HIS IS WHERE I go to ----------------

  {
    method: "GET",
    path:"/createpost",
    handler:function(req,reply) {
      reply.view("createpost.html",{

      });
    }
  },

  // -----HIS IS WHERE I STARRT TO SAVE DATA TO JSON-----------------

  {
    method: "POST",
    path:"/createpost",
    handler:function(req,reply) {

      var namePost = req.payload;
      console.log(namePost);
      allJson.push(namePost);

      /* fs.writeFile('tempPosts.json', JSON.stringify(allJson), function (err) {
      if (err) throw err;
      console.log('The ' + namePost );
    });*/
    db.saveNewPost(namePost);
    reply.view("bloglist.html",{
      list: allJson
      // blogs: posting.tempPostLists
    })
  }
},

//  this is a list of   users biographies
{
  method: "GET",
  path:"/bios",
  handler:function(req,reply) {
    reply.view("bios.html",{
      userlist: allJson

    });
  }
},

//This page can view single bio of user
//this page uses JSON

{
  method:"GET",
  path: "/bios/bio/{index}",
  handler: function(req, reply){
    var thisObject = allJson[req.params.index];
    reply.view("bio.html",{
      icon: thisObject.icon,
      website: thisObject.mywebsite,
      pic: thisObject.pic,
      bio: thisObject.bio,
      name: thisObject.username

    });

  }
},

//this is where are pictures and css

{
  method:"GET",
  path:"/assets/{param*}",
  handler:{
    directory:{
      path:"src"


    }
  }
}]
