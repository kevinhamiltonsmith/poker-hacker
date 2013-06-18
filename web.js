var express = require('express');
var app = express();
var server = require('http').createServer(app);
 
server.listen(5000);
console.log("listening on 5000")
 
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
