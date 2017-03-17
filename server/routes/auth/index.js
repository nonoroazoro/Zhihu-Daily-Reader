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
        _render(req, res);
    }
});

// validate user.
router.post(
    "/session",
    csrf,
    passport.authenticate("local", { failWithError: true }),
    (req, res, next) =>
    {
        // handle success.
        res.redirect("/");
    },
    (err, req, res, next) =>
    {
        if (err.code === "EBADCSRFTOKEN")
        {
            // handle CSRF error.
            res.status(403).send("Don't be evil.");
        }
        else
        {
            // handle auth error.
            _render(req, res, true);
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

/**
 * Render login page.
 *
 * @param {any} req
 * @param {any} res
 * @param {boolean} [hasError] default is `false`, doesn't render auth error.
 */
function _render(req, res, hasError = false)
{
    const message = { csrfToken: req.csrfToken() };
    if (hasError)
    {
        // add auth error.
        message.error = {
            username: req.body.login,
            message: "Incorrect username or password."
        };
    }
    res.render("login", message);
}

module.exports = router;
