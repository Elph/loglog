var gulp       = require( 'gulp' ),
    uglify     = require( 'gulp-uglify' ),
    concat     = require( 'gulp-concat' ),
    browserify = require( 'gulp-browserify' );


gulp.task( 'build-lib-min', function () {
    return gulp.src( 'src/global.js' )
        .pipe( browserify() )
        .pipe( concat( 'loglog.js' ) )
        .pipe( gulp.dest( 'dist/' ) )
        .pipe( uglify() )
        .pipe( concat( 'loglog.min.js' ) )
        .pipe( gulp.dest( 'dist/' ) );
});
gulp.task( 'build-demo', function () {
    return gulp.src( 'demo/js/main.js' )
        .pipe( browserify() )
        .pipe( concat( 'loglog.js' ) )
        .pipe( gulp.dest( 'demo/js/' ) );
});


gulp.task( 'build-test', function () {
    return gulp.src( 'test/tests.js' )
        .pipe( browserify() )
        .pipe( gulp.dest( 'test/bundle/' ) );
});

gulp.task( 'default', [ 'build-lib-min', 'build-demo', 'build-test' ] );
