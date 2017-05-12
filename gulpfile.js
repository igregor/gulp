// initialization
const gulp = require('gulp');
const args = require('yargs').argv;
const config = require('./gulp.config')();
const del = require('del');
// const autoprefixer = require('gulp-autoprefixer');
const $ = require('gulp-load-plugins')({lazy: true});

// tasks
gulp.task('styles', function () {
    log('Compyling scss --> css');

    return gulp
        .src(config.styles.dir.scss) // TODO add all sass to concat
        .pipe($.sourcemaps.init())
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer())
        // .pipe(concat('all.css')) // TODO use for all sass
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function (done) {
    var files = [
        config.temp + '**/*.css',
        config.temp + '**/*.css.map'
    ];
    clean(files,done);
});

gulp.task('watch-sass', function () {
    gulp.watch([config.styles.dir.scss], ['styles']);
});

// helper functions
function clean (path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path,done);
}

function log (msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
