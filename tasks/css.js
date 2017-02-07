const pkg = require('../package.json')

const gulp = require('gulp')

const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

const connect = require('gulp-connect')

gulp.task('css', () => {
  gulp
    .src(`${pkg.folders.src}/css/main.styl`)
    .pipe(stylus({ 'include css': true }))
    .pipe(autoprefixer('last 10 versions'))
    .pipe(cssnano())
    .pipe(gulp.dest(`${pkg.folders.dist}/css`))
    .pipe(connect.reload())
})
