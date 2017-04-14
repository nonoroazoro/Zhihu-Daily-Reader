const session = require("express-session");
const FileStore = require("session-file-store")(session);

/**
 * Expose `session`.
 */
module.exports = session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: false,
    saveUninitialized: false,
    secret: "e5d5033fa9e11b54627a2b42b409a0ec",
    store: new FileStore(
        {
            path: "./.sessions",
            retries: 2,
            logFn: () => { }
        }
    )
});
