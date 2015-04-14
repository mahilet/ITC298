//your first node script!

//var fs = require("fs");
var files = require("./files");
console.log(files);
var whenRead = function (err,data){
//  console.log("Error is",err);
if (err) return console.log("Couldn't read file");

  console.log ("File containts:", data);
};


//fs.readFile("sample.txt", "utf8", function (err,data){console.log("File containts:", data);


//fs.readFile("sample.txt", "utf8", whenRead);
files.read("sample.txt" , whenRead);
var request = require("request");
var ul = "https://github.com/mahilet/itc298-materials/blob/master/readme.rst"
request (url, function (err, response, body){
  console.log("Body length: , body.length");

});
