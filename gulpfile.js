const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

function styles() {
	return (
		gulp
			.src("src/scss/main.scss")
			.pipe(sass())
			// .pipe(cssnano())
			.pipe(rename("styles.css"))
			.pipe(gulp.dest("./"))
			.pipe(browserSync.stream())
	);
}

function templates() {
	return gulp
		.src("templates/pages/*.pug")
		.pipe(
			pug({
				doctype: "html",
				pretty: true,
			})
		)
		.pipe(gulp.dest("./dist"));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "./index.html",
		},
	});
	gulp.watch("src/scss/**/*.scss", styles);
	gulp.watch("index.html").on("change", browserSync.reload);
}

exports.watch = watch;
exports.templates = templates;
