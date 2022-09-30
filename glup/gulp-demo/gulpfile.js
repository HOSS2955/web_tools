// be attention//https://supergeekery.com/blog/tutorial-using-gulp-with-htmlprocess-and-concatenate

var gulp = require("gulp"),
  processhtml = require("gulp-processhtml");
opts = {
  /* plugin options */
};

gulp.task("default", function () {
  return gulp
    .src("./project/*.html")
    .pipe(processhtml(opts))
    .pipe(gulp.dest("dist"));
});

// const gulp = require("gulp");
const { src, dest, parallel } = require("gulp");

var globs = {
  html: "dist/*.html",
  css: "project/css/**/*.css",
  img: "project/pics/*",
  js: "project/js/**/*.js",
};
const imagemin = require("gulp-imagemin");
function imgMinify() {
  return gulp.src(globs.img).pipe(imagemin()).pipe(gulp.dest("dist/images"));
}

exports.img = imgMinify;

const htmlmin = require("gulp-htmlmin");
function minifyHTML() {
  return src(globs.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist"));
}

exports.html = minifyHTML;

const concat = require("gulp-concat");
const terser = require("gulp-terser");

function jsMinify() {
  return src(globs.js, { sourcemaps: true })
    .pipe(concat("app.min.js"))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}
exports.js = jsMinify;

var cleanCss = require("gulp-clean-css");
function cssMinify() {
  return src(globs.css)
    .pipe(concat("style.min.css"))

    .pipe(cleanCss())
    .pipe(dest("dist"));
}
exports.css = cssMinify;

exports.default = parallel(imgMinify, jsMinify, cssMinify, minifyHTML);
