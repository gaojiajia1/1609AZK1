// 引用
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var fs = require('fs');
var path = require('path');
var url = require('url');

// 起服务
gulp.task('server', function () {
    return gulp.src('src')
    .pipe(server({
        port: 9090,
        middleware: function (req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if (pathname === '/favicon.ico') {
                res.end('')
                return false;
            }
            if (pathname === '/api/list') {

            } else {
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }
    }))
})

// 编译sass
gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

// 压缩js
gulp.task('uglify', function () {
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./src/build'))
})

// 合并css和js
gulp.task('concat', function () {
    return gulp.src('./src/**.{css, js}')
    .pipe(concat())
    .pipe(gulp.dest('./src/build'))
})

// 监听
gulp.task('watch', function () {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

// 开发服务dev
gulp.task('dev', gulp.series('sass', 'uglify', 'server', 'watch'))