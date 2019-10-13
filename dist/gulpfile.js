const gulp = require('gulp');
const jshint = require('gulp-jshint');


//Build HTML
gulp.task('buildHTML', () => {
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
  });


//Build JS
gulp.task('buildJS', () => {
    gulp.src('*.js')
      .pipe(jshint({
          esversion: 8
      }))
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest('dist'));
  });