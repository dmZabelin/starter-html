import gulp from "gulp";

// Конфигурации и пути
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import gulpIf from "gulp-if";

import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import webp from "gulp-webp";

export default () => {
    return gulp.src(path.img.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "IMG",
            message: error.message,
        }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(gulpIf(app.isProd, webp()))
    .pipe(gulp.dest(path.img.dest))
    .pipe(gulpIf(app.isProd, gulp.src(path.img.src)))
    .pipe(gulpIf(app.isProd, newer(path.img.dest)))
    .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
    .pipe(gulpIf(app.isProd, gulp.dest(path.img.dest)))
};