import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import vinylSourceStream from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';

const Server = require('karma').Server;
const plugins = require('gulp-load-plugins')();

const src = {
    sass: 'src/**/*.scss',
    html: 'src/**/*.html',
    scripts: {
        exclude: '!src/scripts/**/*.spec.js',
        all: 'src/scripts/**/*.js',
        app: 'src/scripts/index.js'
    }
};

const build = 'build/';
const dest = {
    css: build,
    scripts: {
        file: 'app.min.js',
        folder: build + 'scripts/'
    }
}

gulp.task('clean', () => {
    return gulp.src(build)
        .pipe(plugins.clean({
            force: true
        }));
});

gulp.task('build-html', () => {
    return gulp.src(src.html)
        .pipe(gulp.dest(build))
        .pipe(plugins.connect.reload());
});

gulp.task('build-css', () => {
    gulp.src(src.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.concat('index.min.css'))
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest(dest.css));
});

gulp.task('jshint', () => {
    return gulp.src([src.scripts.all, src.scripts.exclude])
        .pipe(plugins.jshint({
            esnext: true
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

/* Compile all script files into one output minified JS file. */
gulp.task('build-js', ['jshint'], () => {

    var sources = browserify({
            entries: src.scripts.app,
            debug: true // Build source maps
        })
        .transform(babelify.configure({
            presets: ["es2015"]
        }));

    return sources.bundle()
        .on('error', handleError)
        .pipe(vinylSourceStream(dest.scripts.file))
        .pipe(vinylBuffer())
        .pipe(plugins.sourcemaps.init({
            loadMaps: true
        }))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: true
        }))
        .pipe(gulp.dest(dest.scripts.folder))
        .pipe(plugins.connect.reload());
});

gulp.task('serve', ['build', 'watch'], () => {
    plugins.connect.server({
        root: './',
        port: '3000',
        livereload: true,
        fallback: 'index.html'
    });
});


gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
  .start();
});

gulp.task('watch', () => {
    gulp.watch(src.sass, ['build-css']);
    gulp.watch(src.html, ['build-html']);
    gulp.watch([src.scripts.all, src.scripts.exclude], ['build-js']);
    gulp.watch([dest.scripts.folder + dest.scripts.file, 'src/**/*.spec.js'], ['test'])
})


gulp.task('build', ['build-js', 'build-html', 'build-css']);
gulp.task('default', ['serve']);
