var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    csslint = require('gulp-csslint'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function() {
    return gulp.src(['src/**/*', '!src/scss/**/*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-img', function() {

    return gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
    return gulp.src('src/**/*')
        .pipe(usemin({
            js: [uglify],
            css: [autoprefixer]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('style', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('sass', function() {
    return gulp.watch('src/scss/*.scss', ['style']);
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.start('sass');

    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch('src/js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });



    gulp.watch('src/css/**/*.css').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.reporter());
    });
});