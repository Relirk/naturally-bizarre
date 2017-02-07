const pkg = require('../package.json')

const gulp = require('gulp')

const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')

const connect = require('gulp-connect')

gulp.task('img', () => {
  gulp
    .src(`${pkg.folders.src}/img/**`)
    .pipe(changed(`${pkg.folders.dist}/img`))
    .pipe(imagemin())
    .pipe(gulp.dest(`${pkg.folders.dist}/img`))
    .pipe(connect.reload())
})
