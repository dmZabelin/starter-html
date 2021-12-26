const isProd = process.argv.includes("--production");
const isDev = !isProd;

export default {
    isProd: isProd,
    isDev: isDev,
    htmlmin: {
        collapseWhitespace: isProd,
        removeComments: isProd
    },
    sass: {
        includePaths: "./node_modules/"
    },
    autoprefixer: {
        cascade: isProd
    },
    cleanCSS: {
        level: 2
    },
    rename: {
        suffix: ".min",
        extname: ".css"
    },
    renameJS: {
        suffix: ".min",
        extname: ".js"
    },
    webpack: {
        mode: isProd ? "production" : "development"
    },
    imagemin: {
        verbose: true
    },
    fonter: {
        formats: ["woff", "ttf", "eot"]
    }
}