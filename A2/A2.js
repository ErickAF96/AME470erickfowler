var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var Client = require('node-rest-client').Client

app.get("/", function (req, res) {
    res.redirect("index.html")
});

app.get("/", function (req, res) {
    res.redirect("index.html")
});

app.get("/add", function (req, res) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    var result = a + b;
    res.send(result.toString());
});

app.get("/sub", function (req, res) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    var result = a - b;
    res.send(result.toString());
});


app.get("/mult", function (req, res) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    var result = a * b;
    res.send(result.toString());
});


app.get("/div", function (req, res) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    var result = a / b;
    res.send(result.toString());
});

app.get("/eval", function (req, res) {
    var eq = req.query.eq;
    
	var r = eq + " = " + eval(eq) + "\n";
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(r);
});


app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
