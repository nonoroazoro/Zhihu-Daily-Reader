const path = require("path");
const express = require("express");
const router = express.Router();

const passport = require("../../auth/passport");

router.get("/login", (req, res) =>
{
    res.render("login");
});

router.post(
    "/session",
    passport.authenticate("local", { failWithError: true }),
    (req, res, next) =>
    {
        // Handle success.
        if (req.body.remember)
        {
            // Cookie expires after 30 days.
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        }
        else
        {
            // Cookie expires at end of session.
            req.session.cookie.expires = false;
        }
        return res.redirect("/");
    },
    (err, req, res, next) =>
    {
        // Handle error. TODO: add error infomation.
        return res.render("login");
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
