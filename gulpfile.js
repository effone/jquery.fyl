const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
 
gulp.task('scss', () =>
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload())
);

gulp.task('js', () =>
	gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-object-assign']
		}))
		.pipe(concat('mybb-autocomplete.js'))
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
);

gulp.task('html', () =>
    gulp.src('dist/example/index.html')
        .pipe(connect.reload())
);

gulp.task('connect', () =>
    connect.server({
        root: ['dist/example/', 'dist/'],
        livereload: true
    })
);

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./dist/example/index.html', ['html']);
});

gulp.task('default', ['connect', 'watch']);