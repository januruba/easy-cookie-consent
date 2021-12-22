const { parallel, src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const less = require('gulp-less');
const path = require('path');

/**
 * Minify CSS
 */
function css() {
  return src('./src/*.less').pipe(less({paths:[path.join(__dirname, 'less', 'includes') ]})).pipe(cssnano({zindex: false})).pipe(dest("./dist/"));
}

/**
 * Minify JS
 */
function js() {
  return src("./src/plcb-scripts.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(dest("./dist/"));
}

/**
 * Watch changes in CSS and JS src files and minify
 */
function watchFnc() {
  watch("./src/*.css", css);
  watch("./src/*.less", css);
  watch("./src/*.js", js);
}

/**
 * Copy external libs
 */
function copyLibs() {

}

exports.default = parallel(css, js);
exports.watch = watchFnc;