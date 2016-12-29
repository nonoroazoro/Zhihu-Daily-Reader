const path = require("path");
const fs = require("fs-extra");
const config = require("config");
const bunyan = require("bunyan");

const logsFolder = config.logs || "./.logs";
try
{
    fs.ensureDirSync(logsFolder);
}
catch (err)
{
    console.log(`logs system not started, can not find or create logs folder: ${logsFolder}`, err);
}

const log = bunyan.createLogger({
    name: "zhihu-daily-reader-server",
    serializers: bunyan.stdSerializers,
    streams: [
        {
            level: "debug",
            type: "rotating-file",
            path: path.join(logsFolder, "debug.json"),
            period: "7d",
            count: 2
        },
        {
            level: "warn",
            type: "rotating-file",
            path: path.join(logsFolder, "warn.json"),
            period: "1d",
            count: 7
        }
    ]
});

log.on("error", (err, stream) =>
{
    log.debug(err, "bunyan error write logs file");
});

module.exports = log;
