const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    server = require('gulp-server-livereload');
     
gulp.task('images', () =>
    gulp.src('./images/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
        ])
    )
    .pipe(gulp.dest('dist/content'))
);

gulp.task('scripts', function() {
    return gulp.src('./js/**/*.js')
    .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles', function() {
    return gulp.src('./sass/**/*.scss')
    .pipe(concat('all.min.css'))    
    .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))      
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('clean', function() {
  return del(['dist/**/*']);
});

gulp.task('webserver', function() {
    gulp.src('./')
    .pipe(server({
        livereload: true,
        open: true
    }));
});

gulp.task('build', ['clean'], function() {
    gulp.start(['styles', 'scripts', 'images']);
});

gulp.task('default', ['build', 'webserver', 'sass:watch']);