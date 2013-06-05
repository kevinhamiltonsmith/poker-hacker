var express = require("express");
var app = express();
var path = require('path');
app.use(express.logger());

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use("/lib/gumby/css", express.static(__dirname + '/lib/gumby/css'));
});

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/comingsoon.html');
});

app.get('/lib/gumby/css', function(request, response) {
  response.sendfile(__dirname + '/gumby.css');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});