var config = require("config");
require("../app").listen(config.port);

console.log("\nApplication Server started on port: " + config.port);
