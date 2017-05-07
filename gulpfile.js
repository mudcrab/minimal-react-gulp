const gulp = require('gulp');
const babel = require('gulp-babel')
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

const scssVendor = [];

const sassOptions = {
	outputStyle: 'compressed',
	indentType: 'tab',
	indentWidth: 4,
	includePaths: scssVendor
};

gulp.task('react', () => {
	return gulp.src('./src/js/app.jsx')
		.pipe(sourcemaps.init())
		.pipe(babel({
			plugins: [ 'transform-runtime' ]
		}))
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe( gulp.dest( './dist' ) );
});

gulp.task('scss', () => {
	return gulp.src('./src/scss/**/*.scss')
		.pipe( sourcemaps.init() )
		.pipe( sass( sassOptions ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( './dist' ) );
});

gulp.task( 'release', [ 'react', 'scss' ] );
gulp.task( 'watch', [ 'react:watch', 'scss:watch' ] );

gulp.task( 'scss:watch', () => gulp.watch( './src/scss/**/*.scss', { cwd: './' } , [ 'scss' ] ) );
gulp.task( 'react:watch', () => gulp.watch( './src/js/**/*', { cwd: './' }, [ 'react' ] ) );

gulp.task('default', [ 'release', 'watch' ], () => {});
