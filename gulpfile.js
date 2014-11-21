//gulpfile.js

var gulp = require('gulp');
var connect = require('gulp-connect');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concatenate = require('gulp-concat');

gulp.task('copy-html', function() {
	gulp.src(['./app/**/*.html'])
		.pipe(minifyHTML())
		// .pipe(concatenate('index.html'))
		.pipe(gulp.dest('build/'));
});

gulp.task('minifyCSS', function() {
	gulp.src('./app/style/*.css')
		.pipe(minifyCSS())
		.pipe(concatenate('normalize.css'))
		.pipe(gulp.dest('build/style'));
});

gulp.task('uglify', function() {
	gulp.src('./app/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'app/'
	});
});

gulp.task('min', function() {
	connect.server({
		root: 'build/',
		port: 8000
	});
});

gulp.task('default', ['connect']);
gulp.task('build', ['copy-html', 'minifyCSS', 'uglify']);