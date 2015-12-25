var gulp = require("gulp");
var cached = require("gulp-cached");
var jshint = require("gulp-jshint");
var taskListing = require("gulp-task-listing");

gulp.task("help", taskListing.withFilters(null, "help|default"));

gulp.task("jshint", function ()
{
    return gulp.src([
        "**/*.js",
        "!node_modules/**",
        "!./public/assets/libs/**",
        "!./public/assets/zdr/build/**"])
    .pipe(cached("jshint"))
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("watch", function ()
{
    gulp.watch([
        "**/*.js",
        "!node_modules/**",
        "!./public/assets/libs/**",
        "!./public/assets/zdr/build/**"], ["jshint"]);
});

gulp.task("default", ["jshint"] , function ()
{
});