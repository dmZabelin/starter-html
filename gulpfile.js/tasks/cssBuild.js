const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const cssBuild = () => {
    return $.gulp.src($.path.css.src)
    .pipe($.plumber({
        errorHandler: $.notify.onError(error => ({
            title: 'CSS',
            message: error.message,
        }))
    }))
    .pipe($.gulpIf($.app.isProd, cleanCSS($.app.cleanCSS)))
    .pipe(rename($.app.rename))
    .pipe($.gulp.dest($.path.css.dest))
    .pipe($.browserSync.stream());
}
module.exports = cssBuild;