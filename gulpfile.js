import gulp from 'gulp';

// Конфигурация и пути
import path from "./config/path.js";
import app from "./config/app.js";

// Импорт задач
import browserSync from 'browser-sync';
import pugBuild from "./tasks/pugBuild.js";
import fontBuild from "./tasks/fontBuild.js";
import jsBuild from "./tasks/jsBuild.js";
import imgBuild from "./tasks/imgBuild.js";
import scssBuild from "./tasks/scssBuild.js";
import clear from "./tasks/clear.js";

//Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        browser: 'firefox',
        open: true,
    });
};

//Наблюдатель
const watcher = () => {
    gulp.watch(path.pug.watch, pugBuild).on('all', browserSync.reload);
    gulp.watch(path.font.watch, fontBuild);
    gulp.watch(path.font.watch, jsBuild).on('all', browserSync.reload);
    gulp.watch(path.img.watch, imgBuild).on('all', browserSync.reload);
    gulp.watch(path.scss.watch, scssBuild).on('all', browserSync.reload);
};

// Задачи
export { pugBuild };
export { fontBuild };
export { jsBuild };
export { imgBuild };
export { scssBuild };
export { clear };

// Сборка
const build = gulp.series (
    clear,
    gulp.parallel(pugBuild, scssBuild, fontBuild, jsBuild, imgBuild),
);
const dev = gulp.series (
    build,
    gulp.parallel(watcher, server),
);

export default app.isProd ? build : dev;