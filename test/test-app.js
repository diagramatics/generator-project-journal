'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('project-journal:app', function() {
  describe('with only required prompts filled, default gh-pages URL, dark theme', function() {
    // We need a longer timeout for the Git initialization
    this.timeout(7000);
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          projectName: 'Test Project',
          description: 'This is a long description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          email: 'testemail@email.domain',
          twitter: 'twitterhandle',
          repo: 'username/repo',
          githubPages: 'username/repopage',
          customDomain: false,
          disqus: 'disqusshort',
          theme: 'dark',
          color: '#669955',
          deploy: true
        })
        .on('end', done);
    });

    it('creates project configuration files', function() {
      assert.file([
        '.editorconfig',
        '.gitignore',
        'Gemfile',
        '.git'
      ]);
    });

    it('has all Jekyll files created and one initial blog post Markdown file', function() {
      assert.file([
        '_includes',
        '_layouts',
        '_posts',
        '_sass',
        'css',
        '_config.yml',
        'about.md',
        'feed.xml',
        'index.html'
      ]);
    });

    it('has the right configuration values on the _config.yml file', function() {
      assert.fileContent([
        ['_config.yml', /title: Test Project/],
        ['_config.yml', /email: testemail@email\.domain/],
        ['_config.yml', /This is a long description\. Lorem ipsum dolor sit amet, consectetur adipiscing elit\./],
        ['_config.yml', /baseurl: "\/repopage"/],
        ['_config.yml', /url: "https:\/\/username\.github\.io"/],
        ['_config.yml', /twitter_username: twitterhandle/],
        ['_config.yml', /github_project: username\/repo/]
      ]);
    });

    it('has the right configuration values on the main.scss file', function() {
      assert.fileContent([
        ['css/main.scss', /\$brand-color:\s+#669955/],
        ['css/main.scss', /\$text-color:\s+#fdfdfd/],
        ['css/main.scss', /\$background-color:\s+#333/]
      ]);
    });

    it('has the right theme-color meta value on head.html', function() {
      assert.fileContent('_includes/head.html', /<meta name="theme-color" content="#669955">/);
    });

    it('injects the Disqus shortname', function () {
      assert.fileContent('_layouts/post.html', /var disqus_shortname = 'disqusshort';/);
    });
  });

  describe('with all prompts filled, custom domain, light theme', function() {
    // We need a longer timeout for the Git initialization
    this.timeout(7000);
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          projectName: 'Test Project',
          description: 'This is a long description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          email: 'testemail@email.domain',
          twitter: 'twitterhandle',
          repo: 'username/repo',
          githubPages: 'username/repopage',
          customDomain: true,
          url: 'https://testurl.domain',
          basePath: '/path',
          disqus: 'disqusshort',
          theme: 'light',
          color: '#559966',
          deploy: true
        })
        .on('end', done);
    });

    it('creates project configuration files', function() {
      assert.file([
        '.editorconfig',
        '.gitignore',
        'Gemfile',
        '.git'
      ]);
    });

    it('has all Jekyll files created and one initial blog post Markdown file', function() {
      assert.file([
        '_includes',
        '_layouts',
        '_posts',
        '_sass',
        'css',
        '_config.yml',
        'about.md',
        'feed.xml',
        'index.html'
      ]);
    });

    it('has the right configuration values on the _config.yml file', function() {
      assert.fileContent([
        ['_config.yml', /title: Test Project/],
        ['_config.yml', /email: testemail@email\.domain/],
        ['_config.yml', /This is a long description\. Lorem ipsum dolor sit amet, consectetur adipiscing elit\./],
        ['_config.yml', /baseurl: "\/path"/],
        ['_config.yml', /url: "https:\/\/testurl\.domain"/],
        ['_config.yml', /twitter_username: twitterhandle/],
        ['_config.yml', /github_project: username\/repo/]
      ]);
    });

    it('has the right configuration values on the main.scss file', function() {
      assert.fileContent([
        ['css/main.scss', /\$brand-color:\s+#559966/],
        ['css/main.scss', /\$text-color:\s+#333/],
        ['css/main.scss', /\$background-color:\s+#fdfdfd/]
      ]);
    });

    it('has the right theme-color meta value on head.html', function() {
      assert.fileContent('_includes/head.html', /<meta name="theme-color" content="#559966">/);
    });

    it('injects the Disqus shortname', function () {
      assert.fileContent('_layouts/post.html', /var disqus_shortname = 'disqusshort';/);
    });
  });
});
