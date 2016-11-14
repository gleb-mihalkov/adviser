'use strict'

const DST_DIR = './dist'
const SRC_DIR = './src'

const Gulp = require('gulp')
const GulpUtil = require('gulp-util')
const GulpNotify = require('gulp-notify')
const PrettyError = require('pretty-error')
const Path = require('path')
const Util = require('util')

const browserSync = require('browser-sync')
const watch = require('gulp-watch')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const include = require('gulp-include')

const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const cssBase64 = require('gulp-css-base64')

const uglify = require('gulp-uglify')

const htmlExtend = require('gulp-html-extend')

let errorRenderer = null
let errorNotifier = null

let isServer = false

function errorHandler(cb) {
  if (errorNotifier == null) {
    errorNotifier = GulpNotify.onError('Ошибка в Gulp! Смотри вывод терминала.')
    errorRenderer = new PrettyError()
    errorRenderer.skipNodeFiles()
  }

  return (error) => {
    let message = errorRenderer.render(error)
    errorNotifier(error)
    console.log(message)
    cb && cb()
  }
}

function globPath(base, glob) {
  if (glob == null) {
    return base
  }

  if (typeof(glob) == 'string') {
    glob = [glob]
  }

  let list = []

  for (let i = 0; i < glob.length; i++) {
    let item = glob[i]

    let isIgnore = item[0] == '!'
    
    if (isIgnore) {
      item = item.substr(1)
    }
    
    let prefix = isIgnore ? '!' : ''
    let value = prefix + Path.resolve(base, item)

    list.push(value)
  }

  return list
}

function src(glob, cb) {
  let files = globPath(SRC_DIR, glob)

  return Gulp.src(files).pipe(plumber({
    errorHandler: errorHandler(cb)
  }))
}

function dst(cb) {
  let stream = Gulp.dest(DST_DIR)

  if (cb) {
    stream.on('end', cb)
  }

  if (isServer) {
    stream.pipe(browserSync.reload({
      stream: true
    }))
  }

  return stream
}

function observe(glob, taskName) {
  let files = globPath(SRC_DIR, glob)
  watch(files, () => {
    Gulp.start(taskName)
  })
}

process.on('uncaughtException', errorHandler())

Gulp.task('build:css', (cb) => {
  let compress = GulpUtil.env.compress ? cssnano() : GulpUtil.noop()
  let sassOpts = {
    outputStyle: 'expanded'
  }

  src('./main.scss', cb)
    .pipe(sass.sync(sassOpts).on('error', errorHandler()))
    .pipe(include())
    .pipe(cssBase64({
      maxWeightResource: 1024 * 1024 * 1
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(compress)
    .pipe(rename('styles.css'))
    .pipe(dst(cb))
})

Gulp.task('build:js', (cb) => {
  let compress = GulpUtil.env.compress ? uglify() : GulpUtil.noop()

  src('./main.js', cb)
    .pipe(include())
    .pipe(compress)
    .pipe(rename('scripts.js'))
    .pipe(dst(cb))
})

Gulp.task('build:html', (cb) => {
  src('./*.html', cb)
    .pipe(htmlExtend())
    .pipe(dst(cb))
})

Gulp.task('watch', (cb) => {
  observe('./**/*.scss', 'build:css')
  observe('./**/*.js', 'build:js')
  observe('./**/*.html', 'build:html')
})

Gulp.task('server', () => {
  let isTunnel = GulpUtil.env.tunnel != null

  browserSync({
    server: {baseDir: DST_DIR},
    tunnel: isTunnel,
    port: 3010
  })

  isServer = true
})

Gulp.task('build', [
  'build:css', 'build:js', 'build:html'
])

Gulp.task('serve', [
  'watch', 'server'
])

Gulp.task('default', [
  'build', 'serve'
])