const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

//Build HTML
gulp.task('buildHTML', () => {
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
  });


//Build JS
gulp.task('buildJS', () => {
    gulp.src('functions.js')
      .pipe(jshint({
        esversion: 8
      }))
      .pipe(jshint.reporter('default'))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

  // Build babelPolyfill
  gulp.task('babelPolyfill', () => {
    gulp.src('node_modules/babel-polyfill/browser.js')
      .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
  });

  //Run sequence Task
  gulp.task('default', (callback) => {
    runSequence(['buildHTML', 'buildJS', 'babelPolyfill'],'watch', callback);
  });

  //Watch Files and run wih Gulp

  gulp.task('watch',['browserSync'], () => {
    gulp.watch('*.js', ['buildJS']);
    gulp.watch('*.html', ['buildHTML']);

    gulp.watch('dist/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
  });

//BrowserSync initialiazed
gulp.task('browserSync', () => {
    browserSync.init({
      server: './dist',
      port: 3030,
      ui: {
        port: 3031
      }
    });
  });















