#!/usr/bin/env node

// Babel Injection.
require("babel-core/register");

var app = require("../app");
var config = require("config");

app.set("port", config.port);
app.listen(config.port);

console.log("\nApplication Server started on port: " + config.port);
