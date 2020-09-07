let project_folder = 'dist';
let sourse_folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css',
        img: project_folder + '/img',
        js: project_folder + '/js',
        fonts: project_folder + '/fonts',
    },
    src: {
        html: [sourse_folder + '/*.html', "!" + sourse_folder + '/_*.html'],
        css: sourse_folder + '/scss/style.scss',
        img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,webp,ico}',
        js: sourse_folder + '/js/script.js',
        fonts: sourse_folder + '/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    },
    watch: {
        html: sourse_folder + '/**/*.html',
        css: sourse_folder + '/scss/**/*.scss',
        img: sourse_folder + '/img/**/*.{jpg,png,svg,gif,webp,ico}',
        js: sourse_folder + '/js/**/*.js',
    },
    clean: './' + project_folder + '/',
    
}


let { src, dest } = require('gulp');

let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let fileinclude = require('gulp-file-include');
let del = require('del');
let scss = require('gulp-sass');
let autoprefixer = require('autoprefixer');
let group_media = require('gulp-group-css-media-queries');
let clean_css = require('gulp-clean-css');
let rename = require('gulp-rename');
let postcss = require('gulp-postcss');
let uglify = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
let webp_html = require('gulp-webp-html');
let webp_css = require('gulp-webp-css');
// let svg_sprite = require('gulp-svg-sprite');


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
            port: 3000,
            notify: false,
        }
    })
}

function html(){
    return src(path.src.html)
    .pipe(webp_html())
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css(){
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: 'expanded',
        })
    )
    .pipe(
        group_media()
    )
    .pipe(
        postcss([ 
            autoprefixer({
                overrideBrowserslist: ['last 3 versions'],
                cascade: true
            }) 
        ])
    )
    .pipe(webp_css())
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
        rename({
            extname: '.min.css',
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(
        uglify()
    )
    .pipe(
        rename({
            extname: '.min.js',
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images(){
    return src(path.src.img)
    .pipe(
        webp({
            quality: 70
        })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
        imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 3,
            svgoPlugins: [
                {
                    removeViewBox: false
                }
            ]
        })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

// gulp.task('svg_sprite', function(){
//     return gulp.src([sourse_folder + '/iconsprite/*.svg'])
// })

function fonts(params){
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}
function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    // gulp.watch([path.watch.fonts], fonts);
}

function clean(){
    return del(path.clean)
}
let build = gulp.series(clean, gulp.parallel(js, css, html, images), fonts);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;