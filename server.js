// Dependencies
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars')

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Set environment variables required for the app
var PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production') {
var MONGODB = "mongodb://heroku_76l9r11f:kio2gu6in6vi2l0san2ck8ib02@ds159180.mlab.com:59180/heroku_76l9r11f";
}
else {
var MONGODB = "mongodb://localhost/hwwsjscrape1";
}

// Initialize Express
var app = express();

//Define Express routes
var routes = require('./routes/index');
//var users = require('./routes/users');
var scrape = require('./routes/scrape');

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// View Engine
var handlebars  = require('./helpers/handlebars.js')(exphbs);

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Database configuration with mongoose
mongoose.connect(MONGODB);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use('/', routes);
app.use('/scrape',scrape);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
