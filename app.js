/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

/**
 * Create Express server.
 */

var app = express();

/**
 * Express configuration.
 */

var hour = 3600000;
var day = (hour * 24);
var month = (day * 30);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: month }));
app.use(express.errorHandler());

/**
 * Application routes.
 */

//app.get('/', homeController.index);

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});