var gulp = require('gulp');
var getTask = require('./gulp/utils/get-task');

// Initialise gulp tasks.
gulp.task('browserify', getTask('browserify'));
gulp.task('browserify-min', getTask('browserify-min'));
gulp.task('sass', getTask('sass'));
gulp.task('watch', getTask('watch'));


// Main tasks
gulp.task('build', getTask('build'));
gulp.task('default', getTask('default'));
