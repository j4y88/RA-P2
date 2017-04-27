var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task("minify", function(){
	return gulp.src('./css/main.scss')
	.pipe(sass())
	.pipe(rename('min.sty.css'))
	.pipe(clean())
	.pipe(gulp.dest('./css'))
});

gulp.task("test", function(){
	return gulp.src('./test.scss')
	.pipe(sass())
	.pipe(rename('test.css'))
	.pipe(gulp.dest('./'))
});