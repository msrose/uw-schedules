import gulp from 'gulp';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import htmlmin from 'gulp-htmlmin';
import runSequence from 'run-sequence';
import Builder from 'systemjs-builder';

//bundle modules for production
gulp.task('bundle', (done) => {
  let builder = new Builder('public');
  builder.bundle('scripts/main.js', 'dist/application.min.js', {
    minify: true,
    config: {
      defaultJSExtensions: 'js'
    }
  }).then(() => done()).catch(done);
});

// build for production: concatenate, minify
gulp.task('build', (done) => {
  runSequence('clean', 'compile', 'bundle', () => {
    gulp.src(['public/*[!lib]*/*.html', 'public/*.html'])
      .pipe(useref())
      .pipe(gulpif(['*.js', '!vendor/*.js'], uglify()))
      .pipe(gulpif(['*.css', '!vendor/*.css'], autoprefixer()))
      .pipe(gulpif(['*.css', '!vendor/*.css'], cssnano()))
      .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true })))
      .pipe(gulp.dest('dist'))
      .on('end', done);
  });
});
