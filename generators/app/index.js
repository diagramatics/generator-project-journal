'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var moment = require('moment');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var isGitInitialized = function() {
      try {
        fs.accessSync('.git');
      }
      catch(e) {
        return false;
      }
      return true;
    }

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the priceless ' + chalk.red('ProjectJournal') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Your project name:',
      default: this.appname,
      store: true
    }, {
      type: 'input',
      name: 'description',
      message: 'A description of your project:',
      default: 'This is a cool project!',
      store: true
    }, {
      type: 'input',
      name: 'email',
      message: 'Your project contact email (empty for none):',
      store: true
    }, {
      type: 'input',
      name: 'twitter',
      message: 'Your Twitter handle (without the @, can be blank):',
      validate: function(input) {
        if (input.charAt[0] === '@') {
          return 'No need for the @ in the beginning.';
        }
        return true;
      },
      store: true
    }, {
      type: 'input',
      name: 'repo',
      message: 'Your project GitHub organization or specific repo (repo/username format) (empty for none):',
      validate: function(input) {
        if (input.substr(0, 4) === 'http' || input.substr(0, 6) === 'github') {
          return 'No need to pass in the GitHub URL. Just pass in your organization name or use the '+ chalk.red('username') +'/'+ chalk.blue('repo') +' format.';
        }

        // Check the username/repo format too if it's not empty or not an org name.
        var re = /^\w+\/\w+$/g; // (username/repo)
        if (input.match(re) || input.length < 1) {
          return true;
        }
        return 'The repo has to match the '+ chalk.red('username') +'/'+ chalk.blue('repo') +' format.';
      },
      store: true
    }, {
      type: 'input',
      name: 'githubPages',
      message: 'The GitHub repo where this journal is published on (username/repo):',
      validate: function(input) {
        var re = /^\w+\/\w+$/g; // (username/repo)
        if (input.match(re)) {
          return true;
        }
        if (input.substr(0, 4) === 'http' || input.substr(0, 6) === 'github') {
          return 'No need to pass in the GitHub URL. Just use the '+ chalk.red('username') +'/'+ chalk.blue('repo') +' format.';
        }
        return 'The repo has to match the '+ chalk.red('username') +'/'+ chalk.blue('repo') +' format.';
      },
      store: true
    }, {
      type: 'confirm',
      name: 'customDomain',
      message: 'Use custom domain? (if not we\'re going to use GitHub Pages\' default URL)',
      default: false,
      store: true
    }, {
      when: function(response) {
        return response.customDomain;
      },
      type: 'input',
      name: 'url',
      message: 'Website protocol and URL ('+ chalk.green('http://website.domain') +'/path/):',
      validate: function(input) {
        var re = /^http[s]?:\/\/[A-Za-z0-9_.]+[A-Za-z0-9_]+$/i;
        if (input.match(re)) {
          return true;
        }
        else {
          if (input.charAt(input.length - 1) === '/') {
            return 'No need for a slash in the end.';
          }
          else if (!input.match(/^http[s]/i)) {
              return 'Include the protocol (http(s)://) in the beginning.';
          }
          else {
            return 'That doesn\'t seem like a valid format.';
          }
        }
      },
      store: true
    }, {
      when: function(response) {
        return response.customDomain;
      },
      type: 'input',
      name: 'basePath',
      message: 'Website base path (you can leave it empty too) (http://website.domain'+ chalk.green('/path') +'/):',
      validate: function(input) {
        if (input.charAt(0) !== '/') {
          return 'You need a slash (/) in the beginning of the path.';
        }
        return true;
      },
      store: true
    }, {
      type: 'input',
      name: 'disqus',
      message: 'Your Disqus shortname for comments (subdomain) (Register: https://disqus.com/admin/create/):',
      validate: function(input) {
        var re = /^[A-Za-z0-9-]+$/g;
        if (input.match(re)) {
          return true;
        }
        else {
          return 'Use only the Disqus shortname, for example '+ chalk.blue('shortname') +'.disqus.com';
        }
      },
      store: true
    }, {
      type: 'list',
      name: 'theme',
      message: 'Choose your color theme:',
      choices: [
        {
          name: 'Light',
          value: 'light'
        },
        {
          name: 'Dark',
          value: 'Dark'
        }
      ],
      default: 'light',
      store: true
    }, {
      type: 'input',
      name: 'color',
      message: 'Your primary color (#hex):',
      default: '#2a7ae2',
      validate: function(input) {
        var re = /^#[a-f0-9]{3,6}$/i;
        if (input.match(re)) {
          return true;
        }
        if (input.charAt(0) === '#') {
          return 'You have to include a # in the beginning';
        }
        return 'That doesn\'t look like a hex string.';
      },
      store: true
    }, {
      when: function() {
        return !isGitInitialized();
      },
      type: 'confirm',
      name: 'deploy',
      message: 'Immediately deploy to GitHub after this?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      // Make sure we have a URL and basePath even if the user didn't select custom domains
      if (!props.customDomain) {
        var split = props.githubPages.split('/');
        props.url = 'https://' + split[0] + '.github.io';
        props.basePath = '/' + split[1];
      }

      this.props = props;
      // To access props later use this.props.someOption;

      this.log(chalk.green('Awesome!') + ' we\'ll now set up the whole environment for you.');
      done();
    }.bind(this));
  },

  configuring: {
    git: function() {
      this.copy('gitignore', '.gitignore');
    },

    gemfile: function() {
      this.copy('Gemfile');
      this.copy('Gemfile.lock');
    },

    editorconfig: function() {
      this.copy('editorconfig', '.editorconfig');
    }
  },

  writing: {
    scss: function() {
      this.directory('_sass');
      this.template('css/main.scss');
    },

    jekyllConfig: function() {
      this.template('_config.yml');
    },

    layouts: function() {
      this.copy('_layouts/default.html');
      this.copy('_layouts/page.html');
      this.template('_layouts/post.html');
    },

    includes: function() {
      this.copy('_includes/footer.html');
      this.copy('_includes/header.html');
      this.template('_includes/head.html');
    },

    posts: function() {
      this.template('_posts/welcome-to-jekyll.md', '_posts/' + moment().format('YYYY-mm-DD') + '-welcome-to-jekyll.md', {
        date: moment().format('YYYY-MM-DD HH:mm:ss ZZ')
      });
    },

    others: function() {
      this.copy('about.md');
      this.copy('feed.xml');
      this.copy('index.html');
    }
  },

  install: function () {
    var done = this.async();

    this.log('Running '+ chalk.yellow('bundle install') +'...');
    this.spawnCommand('bundle', ['install']);

    if (this.props.deploy) {
      this.log('Setting up '+ chalk.yellow('Git') +' and immediately deploying...');
      // TODO: yay async callback hell
      this.spawnCommand('git', ['init']).on('close', function() {
        this.spawnCommand('git', ['checkout', '-b', 'gh-pages']).on('close', function() {
          this.spawnCommand('git', ['add', '-A']).on('close', function() {
            this.spawnCommand('git', ['add', '-A']).on('close', function() {
              this.spawnCommand('git', ['commit', '-m', '"Initial commit"']).on('close', function() {
                this.spawnCommand('git', ['remote', 'add', 'origin', 'https://github.com/' + this.props.githubPages + '.git']).on('close', function() {
                  this.spawnCommand('git', ['push', '-u', 'origin', 'gh-pages']).on('close', function() {
                    this.log('Git setup '+ chalk.green('finished') +'. Refer to the errors to see if remote pushing was successful.');
                    done();
                  }.bind(this));
                }.bind(this));
              }.bind(this));
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }
  },

  end: function () {
    this.log(chalk.green('We\'re done!'));
    this.log('You can run '+ chalk.blue('yo project-journal:post') +' to scaffold a blog post entry too.');
    this.log('Thank you for using generator-project-journal!');
  }
});
