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
        return res.redirect("/");
    },
    (err, req, res, next) =>
    {
        // Handle error.
        return res.render("login", {
            error:
            {
                username: req.body.login,
                message: "Incorrect username or password."
            }
        });
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
