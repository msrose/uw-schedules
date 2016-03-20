import gulp from 'gulp';

const htmlFiles = 'src/**/*.html';

gulp.task('html', () => {
  gulp.src(htmlFiles)
    .pipe(gulp.dest('public'));
});

gulp.task('html:watch', () => {
  gulp.watch(htmlFiles, ['html']);
});
