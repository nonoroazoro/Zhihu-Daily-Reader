var config = require("config");
require("../app").listen(config.port);

console.log("Server started on port: " + config.port);
