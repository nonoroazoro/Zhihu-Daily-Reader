#!/usr/bin/env node

var config = require("config");
var port = process.env.PORT || config.port;
require("../app").listen(port);

console.log("Server Started on Port: " + port);