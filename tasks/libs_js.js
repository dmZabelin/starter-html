import gulp from "gulp";
import path from "../config/path.js";
export default () => {
   return gulp.src(path.libsJs.src)
   .pipe(gulp.dest(path.libsJs.dest))
}
