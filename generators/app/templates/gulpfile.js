const gulp = require('gulp'),
  zip = require('gulp-zip'),
  {
    Database,
    aql
  } = require('arangojs'),
  ts = require('gulp-typescript');


gulp.task('typescript', () => {
  const project = ts.createProject('./tsconfig.json');
  return gulp.src('./src/**/*.ts')
    .pipe(project())
    .pipe(gulp.dest('lib'));
});


gulp.task('pack', ['typescript'], () => {
  return gulp.src([
      './*',
      '!./node_modules/',
      '!./src'
    ])
    .pipe(zip('<%= name %>.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('upload', ['pack'], async() => {
  const db = new Database({
    url: '<%= url %>'
  });

  db.useDatabase(dbName);

  const file = fs.createReadStream('dist/<%= name %>.zip')
  const found = (await db.listServices()).find(m => m.name === '<%= name %>');

  if (!found) {
    const info = await db.installService('<%= mount %>', file);
  } else {
    const info = await db.replaceService('<%= mount %>', file);
  }

});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.ts', ['typesript']);
});

gulp.task('watch:upload', () => {
  gulp.watch('./src/**/*.ts', ['upload']);
});

gulp.task('default', ['typescript'])
