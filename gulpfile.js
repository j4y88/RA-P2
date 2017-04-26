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