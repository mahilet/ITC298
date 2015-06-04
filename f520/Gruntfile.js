//Gruntfile.js

  //locate all js files inside src/js/
  //"src/js/**/*.js"
  //will find: scr/js/lib/share.min.js
  //src/js/main.js
  //will not find:
  //scr/js/index.html
  //src/404.js
  //below is only for package.json
  //npm install grunt --save

  //npm install grunt-cli -g
  //npm install grunt-contrib-watch --save
  //npm install grunt-concurrent
  //npm install grunt-nodemon
  //npm install grunt-autoprefixer
  //grunt --help (documentation)

  //using "globbing patterns" to locate all js files inside src/js/
  //"src/js/**,*.js"
  // /**/ means they may be in subfolders

module.exports = function(grunt) {




  //putting tasks in array lets you start a series of tasks in a specific order
  grunt.registerTask("hi", ["hello"]);
  
  grunt.registerTask("default",["autoprefixer","nodemon"]);

  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");

  grunt.loadNpmTasks('grunt-contrib-jshint');
  //jshint should help with debugging
  //enable with 'grunt jshint' in command window until
  // it is part of 'concurrent'


  // aways 3 levels deep--dev is the target
  //add keys for each of theiese
  grunt.initConfig({

        concurrent: {
          //'dev' is a 'target'
          dev:{
            tasks: ["watch","nodemon"],
            options: {
              //below makes user is logs errors out in the console while on
              logConcurrentOutput: true
            }

          }
        },

    nodemon: {
      dev: {
        script: "index.js"
      }
    },
//below is top-level config object for contrib-watch
    watch:{
      options: {
        livereload: true
      },
      //'prefix' is not for auto-prefixer
      prefix: {
        //when these files change...
        files:"src/css/**/*.css",
        //do this...
        tasks: ["autoprefixer"]
      },
      template: {
        files:"**/*.html",
        tasks:["hello"]
        //this should say hello everytime html is changed
      }
    },

    autoprefixer: {
      dev: {
        expand: true,
        flatten: true,
        src:"src/css/**/*.css",
        dest:"build/css/"

      }
    }

  });
};
