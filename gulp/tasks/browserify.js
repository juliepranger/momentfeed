var PATHS = require('../paths');

var browserify = require('browserify');
var source = require('vinyl-source-stream')

module.exports = function(gulp) {
  return function() {
    return browserify(PATHS.SRC.JS + 'main.js', {debug: true})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(PATHS.DIST.JS));  
  }
};
