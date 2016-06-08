'use strict'
const gulp = require('gulp')
const GulpRequire = require('require-gulp-tasks')
const Mocha = require('gulp-mocha')
const Join = require('path').join
const Lint = require('gulp-eslint')
const Newer = require('gulp-newer')

const CWD = process.cwd()
const CONFIG = require(Join(CWD, 'config', 'build.conf'))

let taskModules = [
  'unijas-task-runserver',
  'unijas-task-build-stylus',
  'unijas-task-buildjs'
]

taskModules.forEach((module) => GulpRequire(module, gulp))

gulp.task('mocha', function () {
  return gulp.src(Join(CWD, 'test', 'components'))
    .pipe(Mocha({ui: 'bdd', reporter: 'spec' }))
})

gulp.task('lint', function () {
  const DEST = Join(CWD, 'dist', 'public', '**', '*.js')
  gulp.src(Join(CWD, 'src', '**', '*.js'))
    .pipe(Newer(DEST))
    .pipe(Lint())
    .pipe(Lint.format())
})

gulp.task('watch', ['buildjs:vendor', 'buildjs:client'], function () {
  gulp.watch(Join(CWD, 'src' , '**', '*.j*'), ['lint','buildjs:client'])
  gulp.watch(Join(CWD, 'src', 'stylesheets', '**', '*.styl'), ['stylus'])
  gulp.start('runserver')
})
