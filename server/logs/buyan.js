const fs = require("fs-extra");
const path = require("path");
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
            stream: process.stdout
        },
        {
            level: "warn",
            type: "rotating-file",
            path: path.join(logsFolder, "warn.log.json"),
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
