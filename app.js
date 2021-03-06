
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars  = require('express-handlebars'), hbs;
var app = express();

app.set('port', 1337);
app.set('views', path.join(__dirname, 'views'));

/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// send app to router
require('./router')(app, handlebars);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
