var PATHS = require('../paths');

var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;

var onError = require('../utils/on-error');

module.exports = function(gulp) {
  return function(callback) {
    var sassOpts = {
      outputStyle: 'compressed',
      includePaths: ['styles'].concat(neat)
    };

    return gulp.src('./source/sass/main.scss')
      .pipe(plumber())
      .pipe(sass(sassOpts).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(PATHS.DIST.CSS));
  };
};
