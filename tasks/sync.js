const pkg = require('../package.json')
const gulp = require('gulp')
const browser = require('browser-sync')

gulp.task('sync', () => {
  browser.init(`${pkg.folders.src}/**`, {
    server: {
      baseDir: ''
    }
  })
})
