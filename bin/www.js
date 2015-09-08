var config = require("config");
require("../app").listen(config.port);

console.log("Application Server started on port: " + config.port);
