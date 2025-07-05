'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
// const sass = require('gulp-sass')(require('sass'));
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
// import cssmin from 'gulp-cssmin';
import cleanCSS from 'gulp-clean-css';

const _sass = gulpSass(sass);

// // import autoprefixer from 'gulp-autoprefixer';
// // import cssmin from 'gulp-cssmin';
// const gulp = require('gulp'); // gulp 编译 scss文件的插件
// const sass = require('gulp-sass')(require('sass')); // gulp 编译 scss文件的插件
// const autoprefixer = require('gulp-autoprefixer'); // 根据设置浏览器版本自动处理浏览器前缀的插件
// const cssmin = require('gulp-cssmin'); // 压缩css文件的插件

gulp.task('sass', function () {
  // 新建 compile 任务
  return gulp
    .src('./src/*.scss') // 匹配所有的 src目录下的 scss 文件
    .pipe(_sass())
    .pipe(
      autoprefixer({
        // 设置浏览器自动前缀
        cascade: false //文件不缓存
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' })) // 压缩css文件
    .pipe(gulp.dest('./dist')); //将编译后的文件放在 lib 目录下
});

// gulp.task('copyfont', function () {
//   // iconfont 图标编译任务
//   return gulp
//     .src('./src/fonts/**') // 匹配 iconfont 目录下的所有文件
//     .pipe(cssmin()) // 压缩匹配文件
//     .pipe(gulp.dest('./lib/fonts')); // 将文件输出带 lib/fonts 目录下
// });
