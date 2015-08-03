'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('project-journal:post', function() {
  describe('With date only and two categories', function () {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/post'))
      .withPrompts({
        title: 'Mocha Test',
        date: '2015-05-05',
        categories: 'test category'
      })
      .on('end', done);
    });

    it('creates the post file', function() {
      assert.file([
        '_posts/2015-05-05-mocha-test.md'
      ]);
    });

    describe('Front-matter checks', function() {
      it('has the right post title', function() {
        assert.fileContent('_posts/2015-05-05-mocha-test.md', /title:\s+\"Mocha Test"/);
      });

      it('has the appropriate date', function() {
        assert.fileContent('_posts/2015-05-05-mocha-test.md', /date:\s+2015-05-05 00:00:00/);
      });

      it('has the categories', function() {
        assert.fileContent('_posts/2015-05-05-mocha-test.md', /categories:\s+test category/);
      });
    });
  });

  describe('With date and time and no categories', function () {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/post'))
      .inDir(path.join(__dirname, 'asd'))
      .on('end', done);
    });
    it('creates the post file', function() {
      assert.file([
        '_posts/2015-05-05-mocha-test-two.md'
      ]);
    });
  });

  describe('With date and time and no categories', function () {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/post'))
      .withPrompts({
        title: 'Mocha Test Two',
        date: '2015-05-05 02:02:22',
        categories: ''
      })
      .on('end', done);
    });

    it('creates the post file', function() {
      assert.file([
        '_posts/2015-05-05-mocha-test-two.md'
      ]);
    });

    describe('Front-matter checks', function() {
      it('has the right post title', function() {
        assert.fileContent('_posts/2015-05-05-mocha-test-two.md', /title:\s+\"Mocha Test Two"/);
      });

      it('has the appropriate date', function() {
        assert.fileContent('_posts/2015-05-05-mocha-test-two.md', /date:\s+2015-05-05 02:02:22/);
      });

      it('has the categories', function() {
        assert.fileContent('_posts/2015-05-05-mocha-test-two.md', /categories:\s+/);
      });
    });
  });
});
