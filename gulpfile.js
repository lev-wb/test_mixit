const projectFolder = 'build';
const sourceFolder = 'src';
const path = {
  build:{
    html: projectFolder + '/',
    css: projectFolder + '/css/',
    js: projectFolder + '/js/',
    img: projectFolder + '/img/',
    fonts: projectFolder + '/fonts/',
  },

  src:{
    html: sourceFolder + '/index.html',
    //html: sourceFolder + '/pages/*.pug',
    css: sourceFolder + '/scss/*.scss',
    js: sourceFolder + '/js/*.js',
    img: sourceFolder + '/img/**/*.{jpg,png,svg,webp}',
    fonts: sourceFolder + '/fonts/*',
  },

  watch:{
    html: sourceFolder + '/index.html',
    css: sourceFolder + '/scss/**/*.scss',
    js: sourceFolder + '/js/*.js',
    img: sourceFolder + '/img/**/*.{jpg,png,svg,webp}',
  },

  clean: './' + projectFolder + '/'
};

const { src, dest} = require('gulp'); 
const gulp = require('gulp');
const plumber = require('gulp-plumber')
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter')
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
//const webpCSS = require('gulp-webpcss');

function html() {
  return src(path.src.html)
    .pipe(plumber())
    .pipe(pugLinter({reporter: 'default'}))
    //.pipe(pug({
    //  pretty: false
    //}))
    //.pipe(webpHTML())
    .pipe(dest(path.build.html));
}

function css() {
  return src(path.src.css)
    .pipe(scss({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist:['last 5 versions'],
      cascade: true
    }))
    //.pipe(webpCSS())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(rename({
      extname:'.min.css'
    }))
    .pipe(dest(path.build.css));
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname:'.min.js'
    }))
    .pipe(dest(path.build.js));
}

function img() {
  return src(path.src.img)
    .pipe(webp({
      quality: 70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLavel: 3 //от 0 до 7
    }))
    .pipe(dest(path.build.img));
}

function clean(){
  return del(path.clean)
}

function watchFiles(){
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}

//const build = gulp.series(clean, gulp.parallel(img, js, css, html));
const build = gulp.series(gulp.parallel(img, js, css, html));
const watch = gulp.parallel(build, watchFiles);

exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


// module.exports.html = gulp.series(pug2html);
// module.exports.css = gulp.series(styles);
