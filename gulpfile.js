const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babel = require('babelify');
const watchify = require('watchify');

const scssVendor = [];

const sassOptions = {
	outputStyle: 'compressed',
	indentType: 'tab',
	indentWidth: 4,
	includePaths: scssVendor
};

const bundleOpts = {
	entries: [ './src/js/app.jsx' ],
	debug: true
};

const b = watchify(
	browserify( Object.assign({}, watchify.args, bundleOpts) )
);

const bdl = () => {
	return b
		.transform(babel, { presets: [ 'es2015' ] })
		.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('.'))
		.pipe( gulp.dest( '../build/resources/main/static' ) )
		.pipe( gulp.dest( '../src/main/resources/static' ) );


};

b.on('update', bdl);
b.on('log', gutil.log);
gulp.task('react', bdl);

gulp.task('scss', () => {
	return gulp.src('./src/scss/**/*.scss')
		.pipe( sourcemaps.init() )
		.pipe( sass( sassOptions ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( '../build/resources/main/static' ) )
		.pipe( gulp.dest( '../src/main/resources/static' ) );
});

gulp.task( 'release', [ 'react', 'scss' ] );
gulp.task( 'watch', [ 'react:watch', 'scss:watch' ] );

gulp.task( 'scss:watch', () => gulp.watch( './src/scss/**/*.scss', { cwd: './' } , [ 'scss' ] ) );
gulp.task( 'react:watch', () => gulp.watch( './src/js/**/*', { cwd: './' }, [ 'react' ] ) );

gulp.task('default', [ 'release', 'watch' ], () => {});
