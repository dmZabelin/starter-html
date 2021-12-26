const pathSrc = "./src";
const pathDest = "./public/dist";

export default {
    root: "./public",
    pug: {
        src: pathSrc + "/pug/pages/*.pug",
        watch: pathSrc + "/pug/**/*.pug",
        dest: pathSrc,
        destHtml: "./public",
    },
    scss: {
        src: pathSrc + "/assets/scss/*.scss",
        watch: pathSrc + "/assets/scss/**/*.scss",
        dest: pathSrc + "/assets/scss"
    },
    css: {
        src: pathSrc + "/assets/scss/*.css",
        watch: pathSrc + "/assets/scss/**/*.css",
        dest: pathDest + "/assets/css/"
    },
    js: {
        src: pathSrc + "/assets/js/*.js",
        watch: pathSrc + "/assets/js/**/*.js",
        dest: pathDest + "/assets/js/"
    },
    img: {
        src: pathSrc + "/assets/img/*.{png,jpg,jpeg,gif,svg}",
        watch: pathSrc + "/assets/img/**/*.{jpg,jpeg,png,gif,svg}",
        dest: pathDest + "/assets/img/"
    },
    font: {
        src: pathSrc + "/assets/fonts/*.{ttf, otf}",
        watch: pathSrc + "/assets/fonts/**/*.{ttf, otf}",
        dest: pathDest + "/assets/fonts/"
    },
    libsCss: {
        src: pathSrc + "/libs/css/*.css",
        watch: pathSrc + "/libs/css/**/*.css",
        dest: pathDest + "/libs/css/"
    },
    libsJs: {
        src: pathSrc + "/libs/js/*.js",
        watch: pathSrc + "/libs/js/**/*.js",
        dest: pathDest + "/libs/js/"
    }
}