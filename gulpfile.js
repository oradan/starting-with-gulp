const gulp = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass'),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer")
//autoprefixer = require('gulp-autoprefixer')

function styles(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(postcss([autoprefixer(
        {
               browsers: ['last 2 versions'],
                cascade: false
             }
    )]))
//    .pipe(autoprefixer({
//     browsers: ['last 2 versions'],
//     cascade: false
//      }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({stream:true}))
}

function scripts(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js','src/js/script.js'])
           .pipe(gulp.dest("src/js"))
           .pipe(browserSync.reload({stream:true}))
}

function startAppServer(){
    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],styles);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/script.js").on('change',browserSync.reload)
}

exports.default=gulp.parallel(scripts,startAppServer)




