//Gruntfile

//npm install grunt-cli -g // global
//npm install grunt --save
//npm install grunt-contrib-watch
//npm install grunt-concurrent
//npm install grunt-nodemon
//npm install grunt-autoprefixer
module.exports = function(grunt) {


  grunt.loadNpmTasks("grunt-autoprefixer");


// grunt.registerTask("default",["autoprefixer",]);
grunt.registerTask("default","autoprefixer");

// initialize means start
grunt.initConfig({
  //this is where i will add all my grunt- nodes


  nodemon:{
        dev:{
             script:"index.js"
        }
    },






//this will automate making my CSS work for MS IE, Mozilla firefox and google
  autoprefixer: {
     dev: {
       expand: true,
       flatten: true,
       //source folder this is your CSS
       src:"public/**/*.css",
       //destination folder this the automated
       dest:"build/css/"
     }
   }


});


};
