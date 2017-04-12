// If the app environment is not set, we default to development
var ENV = process.env.APP_ENV || 'development';

// Here, we use dotenv  to load our env vars in the .env, into process.env
if (ENV === 'development') {
  require('dotenv').load();
}

// Our dependencies and paths of files we use
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  source = require('vinyl-source-stream'),
  ngConfig = require('gulp-ng-config'),
  path = require('path'),
  fs = require('fs'),
  configDev = require('./config-dev.js'),
  configProd = require('./config-prod.js'),
  paths = {
    public: {
      path: 'public/',
      script: './public/js/',
      lib: './public/lib/'
    },
    app: {
      jade: ['!app/shared/**', 'app/**/*.jade'],
      styles: 'app/styles/*.+(less|css)',
      staticFiles: [
        '!app/**/*.+(less|css|js|jade)',
        '!app/images/**/*',
        'app/**/*.*'
      ],
      scripts: {
        app: './scripts/application.js',
        all: './scripts/**/*.js'
      }
    }
  };

/*
 *  We first generate the json file that gulp-ng-config uses as input.
 *  Then we source it into our gulp task.
 *  The env constants will be a saved as a sub-module of our app, ngEnVars.
 *  So we shall name it ngEnvVars.config.
 */
gulp.task('ng-config-dev', function() {
 fs.writeFileSync('./config.json',
      JSON.stringify(configDev[ENV]));
  gulp.src('./config.json')
    .pipe(
      ngConfig('maak-pottery', {
        createModule: false
      })
    )
    .pipe(gulp.dest('./client/scripts/'))
});

gulp.task('ng-config-prod', function() {
 fs.writeFileSync('./config.json',
      JSON.stringify(configProd[ENV]));
  gulp.src('./config.json')
    .pipe(
      ngConfig('maak-pottery', {
        createModule: false
      })
    )
    .pipe(gulp.dest('./client/scripts/'))
});

/*
 * Browserify bundles our Angular env constants, 
 * services and controllers together into one file.
 * So, ng-config has to run first, to generate the angular env contants.
 * We shall add ng-config as a dependency of browserify, so that it runs before it.
 */
gulp.task('browserify', ['ng-config'], function() {
  return browserify(paths.app.scripts.app).bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
    .on('error', gutil.log.bind(gutil, 'Browserify ' +
      'Error: in browserify gulp task'))
    .pipe(source('application.js'))
    .pipe(gulp.dest('./public/js/'));
});
