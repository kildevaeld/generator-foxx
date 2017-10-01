'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the lovely ' + chalk.red('Foxx') + ' generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description'
      },
      {
        type: 'input',
        name: 'url',
        message: 'ArangoDB Host',
        default: 'http://root:password@localhost:8529'
      },
      {
        type: 'input',
        name: 'database',
        message: 'Database',
        default: ctx => ctx.name + '_database'
      },
      {
        type: 'input',
        name: 'mount',
        message: 'Mount',
        default: ctx => '/' + ctx.name.toLowerCase()
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let locals = this.props;

    const templates = [
      'manifest.json',
      'package.json',
      'gulpfile.js',
      'tsconfig.json',
      'docker-compose.yml'
    ];

    templates.forEach(fileName =>
      this.fs.copyTpl(this.templatePath(fileName), this.destinationPath(fileName), locals)
    );

    const files = ['src', 'scripts', 'typings', 'tsconfig.json', '.gitignore'];

    files.forEach(path =>
      this.fs.copy(this.templatePath(path), this.destinationPath(path))
    );

    /* This.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json'),
      locals
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      locals
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      locals
    ); */

    /* this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('scripts'), this.destinationPath('scripts'));
    this.fs.copy(this.templatePath('typings'), this.destinationPath('typings')); */
    // this.fs.copy(this.templatePath('test'), this.destinationPath('test'));
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
