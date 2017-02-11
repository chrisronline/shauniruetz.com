var gulp = require('gulp')
var webpack = require('webpack-stream')
var rimraf = require('rimraf')

gulp.task('clean', function(cb) {
  rimraf('dist/', cb)
})

gulp.task('build', ['clean'], function() {
  return gulp.src('src/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
})
