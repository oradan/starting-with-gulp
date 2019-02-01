const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

function styles(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
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




