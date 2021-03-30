'use strict';

var gulp = require('gulp'),
	mainBowerFiles = require('main-bower-files'),
	watch = require('gulp-watch'),
	autoprefixer = require("gulp-autoprefixer"),
	pug = require("gulp-pug"),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	rename = require('gulp-rename'),
	htmlmin = require('gulp-htmlmin'),
	reload = browserSync.reload;

var path = {
	libs: {
		js: 'app/assets/js/libs/',
		css: 'app/assets/scss/libs/'
	},
	dist: {
		html: 'dist/',
		js: 'dist/assets/js/',
		jsLibs: 'dist/assets/js/libs',
		scss: 'dist/assets/css/',
		css: 'dist/assets/css/libs',
		img: 'dist/assets/img/',
		fonts: 'dist/assets/fonts/'
	},
	app: {
		pug: 'app/pug/pages/*.pug',
		html: 'app/*.html',
		js: 'app/assets/js/*.js',
		scss: 'app/assets/scss/*.scss',
		css: 'app/assets/scss/*.css',
		img: 'app/assets/img/**/*.*',
		fonts: 'app/assets/fonts/**/*.*'
	},
	watch: {
		pug: 'app/pug/**/*.pug',
		html: 'app/**/*.html',
		js: 'app/assets/js/**/*.js',
		scss: 'app/assets/scss/**/*.scss',
		css: 'app/assets/scss/**/*.css',
		img: 'app/assets/img/**/*.*',
		fonts: 'app/assets/fonts/**/*.*'
	},
	clean: './dist'
};

gulp.task('webserver', function () {
	browserSync({
		server: {
			baseDir: './dist'
		},
		tunnel: false,
		host: 'localhost',
		port: 4013,
		logPrefix: "W3DZ"
	})
});

gulp.task('libsJs:build', function () {
	return gulp.src(mainBowerFiles('**/*.js'))
		.pipe(gulp.dest(path.libs.js))
		.pipe(gulp.dest(path.dist.jsLibs))
});

gulp.task('pug:build', function () {
	return gulp.src(path.app.pug)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('app'))
});

gulp.task('html:build', function () {
	return gulp.src(path.app.html)
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(path.dist.html))
		.pipe(reload({ stream: true }));
});

gulp.task('js:build', function () {
	return gulp.src(path.app.js)
		.pipe(sourcemaps.init())
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(sourcemaps.write())
		.pipe(rename({
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(gulp.dest(path.dist.js))
		.pipe(reload({ stream: true }));
});

gulp.task('scss:build', function () {
	return gulp.src(path.app.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({ includePaths: './node_modules/' }))
		.pipe(autoprefixer({
			cascade: true
		}))
		.pipe(gulp.dest('./app/assets/scss'));
});

gulp.task('css:build', function () {
	return gulp.src(path.app.css)
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write())
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(gulp.dest(path.dist.scss))
		.pipe(reload({ stream: true }));
});

gulp.task('image:build', function () {
	return gulp.src(path.app.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.dist.img))
		.pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function () {
	gulp.src(path.app.fonts)
		.pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build', gulp.parallel(
	//'libsCss:build',
	'libsJs:build',
	'pug:build',
	'html:build',
	'js:build',
	'scss:build',
	'css:build',
	'fonts:build',
	'image:build'
));

gulp.task('watch', function () {
	watch([path.watch.pug], gulp.parallel('pug:build'));
	watch([path.watch.html], gulp.parallel('html:build'));
	watch([path.watch.scss], { readDelay: 1000 }, gulp.parallel('scss:build'));
	watch([path.watch.css], gulp.parallel('css:build'));
	watch([path.watch.js], gulp.parallel('js:build'));
	watch([path.watch.img], gulp.parallel('image:build'));
	watch([path.watch.fonts], gulp.parallel('fonts:build'));
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', gulp.parallel('build', 'watch', 'webserver'));