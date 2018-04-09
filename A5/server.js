var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var Client = require('node-rest-client').Client;

var MS = require("mongoskin");
var db = MS.db("mongodb://localhost:27017/ame470");

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.get("/getImage", function (req, res) {
	var data = req.query;
	  var id = data.id;
	  db.collection("img").findOne({id:id}, function(err, result){
	        res.end(JSON.stringify(result));
	  });
});

app.get("/getAllImgs", function (req, res) {
  db.collection('img').find().toArray(function(err, items) {
    console.log(err, items);
    if(!items) items = [];
    res.send(items);
  });
});

app.get("/addImg", function (req, res) {
  var data = req.query;
  db.collection("img").insert(data, function(err, result){
    res.send("1");
  });
});


app.get("/renameImg", function (req, res) {
  var data = req.query;
  var newName = data.name;
  var id = data.id;
  console.log(newName, id);
  db.collection("img").findOne({id:id}, function(err, result){
      result.name = newName;
      db.collection("img").save(result, function(err){
        res.end("1");
      });
  });
});

app.get("/imgFilter", function (req, res) {
	var data = req.query;
	var keys = Object.keys(data);
	var id = data.id;
	
	// var newBlur = data.blur;
// 	var newBrightness = data.brightness;
// 	var newContrast = data.contrast;
// 	var newGrayscale = data.grayscale;
// 	var newHueRotate = data.hueRotate;
// 	var newInvert = data.invert;
// 	var newOpacity = data.opacity;
// 	var newSaturate = data.saturate;
// 	var newSepia = data.sepia;
	
	// console.log(newBlur, id);
// 	console.log(newBrightness, id);
// 	console.log(newContrast, id);
	
    db.collection("img").findOne({id:id}, function(err, result){
		
		for(var i = 0; i < keys.length; i++){
			var key = keys[i];
			result[key] = data[key];
		}
		
        // result.blur = newBlur;
// 		result.brightness = newBrightness;
// 		result.contrast = newContrast;
// 		result.grayscale = newGrayscale;
// 		result.hueRotate = newHueRotate;
// 		result.invert = newInvert;
// 		result.opacity = newOpacity;
// 		result.saturate = newSaturate;
// 		result.sepia = newSepia;
		
        db.collection("img").save(result, function(err){
        res.end("1");
        });
});
 
});


app.get("/deleteImg", function (req, res) {
  var data = req.query;
  var id = data.id;
  db.collection("img").remove({id:id}, function(err, result){
     res.end("1");
  });
});


app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);