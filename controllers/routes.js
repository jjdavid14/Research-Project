var express = require("express");
var users = require("../db/users");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    console.log(users);
    res.render("index", users);
  });

router.get("/api/map", function(req, res) {
    res.json(users);
  });

// Export routes for server.js to use.
module.exports = router;
