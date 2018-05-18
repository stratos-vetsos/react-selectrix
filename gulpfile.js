var gulp = require( 'gulp' ),
    browserSync = require( 'browser-sync' ).create( ),
    gutil = require( 'gulp-util' ),
    sass = require( 'gulp-sass' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    sourcemaps = require( 'gulp-sourcemaps' );

gulp.task( 'styles', function( ) {
    gulp
        .src( 'scss/**/*.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass( { indentedSyntax: false, outputStyle: 'expanded', indentType: 'tab', indentWidth: 1 } ).on( 'error', sass.logError ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './public/dist/css/' ) )
        .pipe( browserSync.reload( { stream: true } ) );
} );

// gulp.task( 'start-server', function() {
//     nodemon( {
//     	script: 'app.js',
//     	env: {
//     		'NODE_ENV': 'development',
//             'DB_OWNER': 'stratos'
//     	}
//     } )
// })

gulp.task( 'browser-sync', function( ) {
    browserSync.init( { proxy: "http://localhost:3010" } )
} )


gulp.task( 'watch', function( ) {
    gulp.watch( 'scss/**/*.scss', [ 'styles' ] );
} )

gulp.task( 'default', [
    'browser-sync', 'styles', 'watch'
], function( ) {
    gutil.log( 'watch' );
} )
