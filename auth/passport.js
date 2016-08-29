const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/user");

const USERNAME_FIELD = "login";
const PASSWORD_FIELD = "password";

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: USERNAME_FIELD,
            passwordField: PASSWORD_FIELD
        },
        (username, password, done) =>
        {
            User.findOne({ username: username }, (err, user) =>
            {
                if (user && user.validPassword(password))
                {
                    return done(null, user);
                }
                else
                {
                    return done(null, false);
                }
            });
        }
    )
);

passport.serializeUser((user, done) =>
{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>
{
    User.findById(id, (err, user) =>
    {
        done(err, user);
    });
});

module.exports = passport;
