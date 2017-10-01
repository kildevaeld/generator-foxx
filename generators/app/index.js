'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay'),
  _ = require('lodash');

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
      },
      {
        type: 'input',
        name: 'collections',
        message: 'Comma separeted list of collections'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;

      this.props = props;

      this.props.collections = this.props.collections
        ? this.props.collections.split(',').map(m => _.trim(m))
        : [];
    });
  }

  writing() {
    let locals = this.props;

    const templates = [
      'manifest.json',
      'package.json',
      'gulpfile.js',
      'tsconfig.json',
      'docker-compose.yml',
      'src'
    ];

    templates.forEach(fileName =>
      this.fs.copyTpl(this.templatePath(fileName), this.destinationPath(fileName), locals)
    );

    const files = ['typings', 'tsconfig.json', '.gitignore'];

    files.forEach(path =>
      this.fs.copy(this.templatePath(path), this.destinationPath(path))
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
