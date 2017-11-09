const gulp = require('gulp')
const environments = require('gulp-environments')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
// const eslint = require('gulp-eslint')
// const eslintify = require('eslintify')
const gulpStylelint = require('gulp-stylelint')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const livereload = require('gulp-livereload')
var server = require('gulp-server-livereload')

var development = environments.development
var production = environments.production

var SassPath = [
  './app/scss/**/*.+(scss|sass)'
]

gulp.task('scss', function() {
  console.log('Compiling scss on ' + environments.current().$name + ' env.')
  gulp.src(SassPath)
    .pipe(development(sourcemaps.init()))
    .pipe(sass({
      includePaths: [
        './node_modules/normalize-scss/sass'
      ],
      style: development ? 'expanded' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(development(sourcemaps.write()))
    .pipe(production(cleanCSS()))
    .pipe(gulp.dest('./app/css'))
    .pipe(development(livereload()))
})

gulp.task('serve', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      directoryListing: false,
      open: false
    }))
})

gulp.task('watch', ['scss'], function() {
  livereload.listen()
  gulp.watch(SassPath, ['scss'])
})


gulp.task('default', ['watch'])
