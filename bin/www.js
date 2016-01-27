const app = require("../app");
const config = require("config");

app.set("port", config.port);
app.listen(config.port);

console.log("\nApplication Server started on port: " + config.port);
