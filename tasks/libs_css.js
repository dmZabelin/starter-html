import gulp from "gulp";
import path from "../config/path.js";
export default () => {
   return gulp.src(path.libsCss.src)
   .pipe(gulp.dest(path.libsCss.dest))
}
