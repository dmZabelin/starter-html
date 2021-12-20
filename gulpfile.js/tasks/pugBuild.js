const pug = require('gulp-pug');
const webpHtml = require("gulp-webp-html");

const pugBuild = () => {
    return $.gulp.src($.path.pug.src)
    .pipe(pug($.app.pugs))
    .pipe($.gulpIf($.app.isProd, webpHtml()))
    .pipe($.gulp.dest($.path.pug.dest));
}
module.exports = pugBuild;