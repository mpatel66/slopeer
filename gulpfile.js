const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!node_modules{,/**}',
    '!.git{,/**}',
    '!**/node_modules{,/**}',
    '!client{,/**}',
  ]);
}

function lint () {
  return gulp.src(addDefSrcIgnore(['**/*.js']), { dot: true })
    .pipe($.eslint({ dotfiles: true }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
}

exports.lint = lint;
