var gulp = require("gulp");
var jshint = require("gulp-jshint");

gulp.task("hint", function ()
{
    gulp.src([
        "**/*.js",
        "!node_modules/**",
        "!./public/assets/libs/**",
        "!./public/assets/zdr/build/**"])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task("default", ["hint"] , function ()
{
});