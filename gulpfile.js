"use sctrict";

var gulp = require("./../node_modules/gulp"),
    connect = require("./../node_modules/gulp-connect"), 
    sass = require('./../node_modules/gulp-sass'),
    minify = require('./../node_modules/gulp-minify'),
    opn = require("./../node_modules/opn");

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});


// Работа с Sass
gulp.task('sass', function () {
  gulp.src('app/scss/*.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))  
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});

// Работа с HTML
gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

// Работа с JS
gulp.task('js', function(){
  gulp.src('app/pre-js/*.js')
    .pipe(minify({
        ext: {
            min: '.min.js'
        },
        noSource: true,
        ignoreFiles: ['*.min.js']
    }))
    .pipe(gulp.dest('app/js'))
});

// Слежка
gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/pre-js/*.js'], ['js']);
  gulp.watch(['app/scss/*.scss'], ['sass']);
});

// Задача по-умолчанию
gulp.task('default', ['connect', 'watch']);