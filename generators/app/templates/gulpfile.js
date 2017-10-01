const gulp = require('gulp'),
  zip = require('gulp-zip'),
  {
    Database,
    aql
  } = require('arangojs'),
  tsc = require('gulp-typescript'),
  gutil = require('gulp-util'),
  fs = require('fs');

const DATABASE_NAME = '<%= database %>',
  NAME = '<%= name %>',
  URL = '<%= url %>' 

gulp.task('typescript', () => {
  const project = tsc.createProject('./tsconfig.json');
  return gulp.src('./src/**/*.ts')
    .pipe(project())
    .pipe(gulp.dest('lib'));
});


gulp.task('pack', ['typescript'], () => {
  return gulp.src([
    './**',
    '!./node_modules/**',
    '!./src/**',
    '!./typings/**',
    '!./dist/**',
    '!./node_modules/',
    '!./src/',
    '!./typings/',
    '!./dist/',
    '!./package-lock.json',
    '!./gulpfile.json'

  ])
    .pipe(zip(`${NAME.toLowerCase()}.zip`))
    .pipe(gulp.dest('dist'));
});

gulp.task('install', ['pack', 'ensure-database'], async() => {
  const db = new Database({
    url: URL
  });

  db.useDatabase(DATABASE_NAME);

  const file = fs.createReadStream(`dist/${NAME.toLowerCase()}.zip`)
  const found = (await db.listServices()).find(m => m.name === NAME);

  if (!found) {
    const info = await db.installService('<%= mount %>', file);
  } else {
    const info = await db.replaceService('<%= mount %>', file);
  }

});

gulp.task('ensure-database', async() => {

  const db = new Database({
    url: URL
  });

  const names = await db.listDatabases();

  if (!~names.indexOf(DATABASE_NAME)) {
    gutil.log("Creating database '%s'", gutil.colors.cyan(DATABASE_NAME));
    await db.createDatabase(DATABASE_NAME);

  }

})

gulp.task('watch', () => {
  gulp.watch('./src/**/*.ts', ['typesript']);
});

gulp.task('watch:install', () => {
  gulp.watch('./src/**/*.ts', ['install']);
});

gulp.task('default', ['typescript'])
