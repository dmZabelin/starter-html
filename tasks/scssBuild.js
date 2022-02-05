import gulp from "gulp";

// Конфигурации и пути
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import gulpIf from "gulp-if";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";
import shortHand from "gulp-shorthand";
import webpCSS from "gulp-webp-css";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";

export default () => {
    return gulp.src(path.scss.src)
	 .pipe(gulpIf(app.isDev, sourcemaps.init()))
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "SCSS",
            message: error.message,
        }))
    }))
    .pipe(sass(app.sass))
    .pipe(gulpIf(app.isProd, webpCSS()))
    .pipe(gulpIf(app.isProd, autoprefixer(app.autoprefixer)))
    .pipe(gulpIf(app.isProd, shortHand()))
	 .pipe(gulpIf(app.isDev, sourcemaps.write()))
    .pipe(gulp.dest(path.scss.dest))
    .pipe(gulpIf(app.isProd, cleanCSS(app.cleanCSS)))
    .pipe(rename(app.rename))
	 .pipe(gulpIf(app.isDev, sourcemaps.write()))
    .pipe(gulp.dest(path.css.dest))
};
