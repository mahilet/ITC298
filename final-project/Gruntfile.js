//Gruntfile.js


module.exports = function(grunt) {
  //locate all js files inside src/js/
  //"src/js/**/*.js"
  //will find: scr/js/lib/share.min.js
  //src/js/main.js
  //will not find:
  //scr/js/index.html
  //src/404.js
  //npm install grunt --save
  //npm install grunt-cli
  //npm install grunt-contrib-watch
  //npm install grunt-concurrent
  //npm install grunt-nodemon
  //npm install grunt-autoprefixer


  grunt.registerTask("hello", function() {
  console.log("hellow rfrom gurnt!!");
  grunt.file.write("build/test.txt","this file is written sync");
});

  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");

  grunt.registerTask("default",["autoprefixer","nodemon"]);


  // aways 3 levels deep--dev is the target
  //add keys for each of theiese
  grunt.initConfig({

        concurrent: {
          dev:{
            tasks: ["watch","nodemon"],
            options: {
              logConcurrentOutput: true
            }

          }
        },

    nodemon: {
      dev: {
        script: "index.js"
      }
    },

    watch:{
      options: {
        livereload: true
      },
      prefix: {
        files:"src/css/**/*.css",
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
