var PATHS = require('../paths');

var concat = require('gulp-concat');
var path = require('path');
var runSequence = require('run-sequence');

module.exports = function(gulp) {
  return function(callback) {
    return runSequence(
      [
        'browserify-min',
        'sass'
      ],
      callback
    );
  };
};
