import gulp from 'gulp';
import cache from 'gulp-cached';
import sass from 'gulp-sass';
import sasslint from 'gulp-sass-lint';
import sourcemaps from 'gulp-sourcemaps';

var sassFiles = 'src/styles/**/*.scss';

// compile sass files to css
gulp.task('sass', () => {
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(cache('sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/styles'));
});

// recompile sass when a file is changed
gulp.task('sass:watch', () => {
  gulp.watch(sassFiles, ['sass']);
});

// lint sass files
gulp.task('sass:lint', () => {
  return gulp.src(sassFiles)
    .pipe(cache('sasslint'))
    .pipe(sasslint())
    .pipe(sasslint.format());
});

// lint whenever a sass file is changed
gulp.task('sass:lint:watch', () => {
  gulp.watch(sassFiles, ['sass:lint']);
});
