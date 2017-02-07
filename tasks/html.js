const pkg = require('../package.json')

const gulp = require('gulp')

const jade = require('gulp-jade')
const htmlmin = require('gulp-htmlmin')

const connect = require('gulp-connect')

gulp.task('html', () => {
  gulp
    .src(`${pkg.folders.src}/html/*.jade`)
    .pipe(jade({ pretty: true }))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest(''))
    .pipe(connect.reload())
})
