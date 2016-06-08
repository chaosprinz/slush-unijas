'use strict'
const gulp = require('gulp')
const GulpRequire = require('require-gulp-tasks')
const Mocha = require('gulp-mocha')
const Join = require('path').join

let taskModules = [
  'unijas-task-runserver',
  'unijas-task-build-stylus',
  'unijas-task-buildjs'
]

taskModules.forEach((module) => GulpRequire(module, gulp))

gulp.task('mocha', function () {
  return gulp.src(Join(process.cwd(), 'test', 'components'))
    .pipe(Mocha({ui: 'bdd', reporter: 'spec' }))
})

gulp.task('watch', ['buildjs:vendor'], function () {
  gulp.watch(Join(process.cwd(), 'src' , '**', '*.j*'), ['buildjs:client'])
  gulp.watch(Join(process.cwd(), 'src', 'stylesheets', '**', '*.styl'), ['stylus'])
  gulp.start('runserver')
})
