const htmlMin = require('gulp-htmlmin');
const htmlBuild = () => {
    return $.gulp.src($.path.html.src)
    .pipe($.plumber({
        errorHandler: $.notify.onError(error => ({
            title: 'HTML',
            message: error.message,
        }))
    }))
    .pipe($.gulpIf($.app.isProd, htmlMin ($.app.htmlmin)))
    .pipe($.gulp.dest($.path.html.dest))
    .pipe($.browserSync.stream());
}
module.exports = htmlBuild;