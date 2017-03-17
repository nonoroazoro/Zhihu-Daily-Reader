const csrf = require("csurf")();
const express = require("express");
const router = express.Router();

const passport = require("../../auth/passport");

// login page.
router.get("/login", csrf, (req, res) =>
{
    if (req.isAuthenticated())
    {
        res.redirect("/");
    }
    else
    {
        res.render("login", { csrfToken: req.csrfToken() });
    }
});

// validate user.
router.post(
    "/session",
    csrf,
    passport.authenticate("local", { failWithError: true }),
    (req, res, next) =>
    {
        // Handle success.
        res.redirect("/");
    },
    (err, req, res, next) =>
    {
        if (err.code === "EBADCSRFTOKEN")
        {
            // Handle CSRF error.
            res.status(403).send("Don't be evil.");
        }
        else
        {
            // Handle auth error.
            res.render("login", {
                error:
                {
                    username: req.body.login,
                    message: "Incorrect username or password."
                },
                csrfToken: req.csrfToken()
            });
        }
    }
);

/*
 * Prevent unauthorized access.
 * All of the login/signup actions should be placed above this.
 */
router.use((req, res, next) =>
{
    if (req.isAuthenticated() || req.path === "/login")
    {
        next();
    }
    else
    {
        res.redirect("/login");
    }
});

module.exports = router;
