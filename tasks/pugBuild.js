import gulp from "gulp";

// Конфигурации и пути
import path from "../config/path.js";
import app from "../config/app.js";

// Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import gulpIf from "gulp-if";

import pug from "gulp-pug";
import webpHtml from "gulp-webp-for-html";
import htmlFormat from "gulp-format-html";
import htmlMin from "gulp-htmlmin";

// Задача
export default () => {
    return gulp.src(path.pug.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "PUG",
            message: error.message,
        }))
    }))
    .pipe(pug())
    .pipe(htmlFormat())
    .pipe(gulpIf(app.isProd, webpHtml([".jpg", ".png", ".gif", ".jpeg",".JPG", ".PNG", ".GIF", ".JPEG", ])))
    .pipe(gulp.dest(path.pug.dest))
    .pipe(gulpIf(app.isProd, htmlMin (app.htmlmin)))
    .pipe(gulp.dest(path.pug.destHtml));
}
