'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the priceless ' + chalk.red('ProjectJournal:post') + ' generator!'
    ));
    var prompts = [{
      type: 'input',
      name: 'title',
      message: 'Title:',
      default: 'Allo\' Allo\'!'
    }, {
      type: 'input',
      name: 'date',
      message: 'Date (yyyy-mm-dd [HH:mm:ss [+- HHmm]]):',
      default: moment().format('YYYY-MM-DD HH:mm:ss ZZ'),
      validate: function(input) {
        // Check for input based on the available format
        if (moment(input, 'YYYY-MM-DD', true).isValid() ||
        moment(input, 'YYYY-MM-DD HH:mm:ss', true).isValid() ||
        moment(input, 'YYYY-MM-DD HH:mm:ss ZZ', true).isValid()) {
          return true;
        }

        return 'That doesn\'t look like a proper format';
      }
    }, {
      type: 'input',
      name: 'categories',
      message: 'Categories (if any, comma separated):',
    }];

    this.prompt(prompts, function (props) {
      // Use the best format for the date
      props.date = moment(props.date, 'YYYY-MM-DD HH:mm:ss ZZ').format('YYYY-MM-DD HH:mm:ss ZZ');

      this.props = props;
      // To access props later use this.props.someOption;

      this.log(chalk.green('Awesome!') + ' we\'ll scaffold the new post out for you.');
      done();
    }.bind(this));
  },

  writing: {
    post: function() {
      this.template('post-template.md', '_posts/' + moment(this.props.date, 'YYYY-MM-DD').format('YYYY-MM-DD') + '-' + _.kebabCase(this.props.title) + '.md');
    }
  },

  end: function () {
    this.log(chalk.green('We\'re done!'));
    this.log('Your new post is in '+ chalk.blue('_posts/' + moment(this.props.date, 'YYYY-MM-DD').format('YYYY-MM-DD') + '-' + _.kebabCase(this.props.title) + '.md') +'. You can now write in Markdown inside that file and commit it with Git to make it available on GitHub straightaway.');
    this.log('Thank you for using generator-project-journal:post!');
  }
});
