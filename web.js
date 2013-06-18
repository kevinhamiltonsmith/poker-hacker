var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(express.logger());

var port = process.env.PORT || 5000; 
server.listen(port, function() {
  console.log("Listening on " + port);
});
