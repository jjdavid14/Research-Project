// Setup our dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// Set up routes for various URLS for the site.
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// Set up ports
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});