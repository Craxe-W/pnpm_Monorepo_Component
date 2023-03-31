const gulp = require('gulp')
const less = require('gulp-less')
const path = require('path')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const del = require('del')
const through = require('through2')
const tsconfig = require('./tsconfig.json')

function clean() {
  return del('./lib/**')
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.less'], {
      base: './src/'
    })
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true
      })
    )
    .pipe(postcss([autoprefixer(['> 1%', 'last 2 versions', 'not ie <= 8'])]))
    .pipe(gulp.dest('./lib/es'))
    .pipe(gulp.dest('./lib/cjs'))
}

function copyAssets() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('lib/assets'))
    .pipe(gulp.dest('lib/es/assets'))
    .pipe(gulp.dest('lib/cjs/assets'))
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .pipe(gulp.dest('lib/cjs/'))
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ESNext'
  })
  return gulp
    .src(['src/**/*.{ts,tsx}'])
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: ['./babel-transform-less-to-css']
      })
    )
    .pipe(gulp.dest('lib/es/'))
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ESNext',
    declaration: true,
    emitDeclarationOnly: true
  })
  return gulp.src(['src/**/*.{ts,tsx}']).pipe(tsProject).pipe(gulp.dest('lib/es/')).pipe(gulp.dest('lib/cjs/'))
}

function copyMetaFiles() {
  return gulp.src(['./README.md', './LICENSE']).pipe(gulp.dest('./lib/'))
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString()
        const parsed = JSON.parse(rawJSON)
        parsed.module = './es/index.js'
        delete parsed.scripts
        delete parsed.devDependencies
        delete parsed.publishConfig
        delete parsed.files
        const stringified = JSON.stringify(parsed, null, 2)
        file.contents = Buffer.from(stringified)
        cb(null, file)
      })
    )
    .pipe(gulp.dest('./lib/'))
}

exports.default = gulp.series(
  clean,
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildStyle),
  copyAssets,
  copyMetaFiles,
  generatePackageJSON
)
