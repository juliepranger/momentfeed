var PATHS = require('../paths');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

module.exports = function(gulp) {
  return function() {
    return browserify(PATHS.SRC.JS + 'main.js')
      .bundle()
      .pipe(source('main.min.js'))
      .pipe(ngAnnotate())
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(PATHS.DIST.JS));
  }
};
