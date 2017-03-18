var PATHS = require('../paths');

module.exports = function(gulp) {
  return function() {
    gulp.watch([PATHS.CSS_SOURCES], ['sass']);
    gulp.watch([PATHS.JS_SOURCES], ['browserify']);
  };
};
