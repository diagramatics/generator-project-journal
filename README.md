# generator-project-journal [![Build Status](https://secure.travis-ci.org/diagramatics/generator-project-journal.png?branch=master)](https://travis-ci.org/diagramatics/generator-project-journal)

This is a [Yeoman](http://yeoman.io) generator for a very basic [Jekyll](http://jekyllrb.com) blog with a journal styling. Perfect for your basic development journal if you like to give updates to your project development on a regular basis.


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![This guy!](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-project-journal from npm, run:

```bash
npm install -g generator-project-journal
```

After installing the generator, you now have two generators in your disposal to immediately churn out the appropriate Jekyll instantiation.

#### project-journal:app

The app generator can be accessed like so:

```bash
yo project-journal
```

This will scaffold out a Jekyll blog, installs the Gem bundle for you, and if you allow it, initialize a Git repo and pushes it straight away to your GitHub remote.

#### project-journal:post

There is another subgenerator that project-journal packs on, which is the post subgenerator. Run it like so:

```bash
yo project-journal:post
```

This will scaffold out a Jekyll blog post with the necessary front matter (title, date, and category) for you. The only thing you need to write is just the content!

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Development

With the Jekyll blog set up, you can run a local development session by running:

```bash
bundle exec jekyll serve -b ""
```

What this does is serving your Jekyll blog on your local machine, by default accessible in `127.0.0.1:4000`. The `-b` argument sets the base path to nothing — the inital value was the repository gh-pages URL or your custom domain. With this you can access the blog on your local machine, and without tampering the `_config.yml` over and over again when you want to deploy or develop locally.

## Contributing

If you found any bugs you can report them to the Issue page of the GitHub repository.

If you're submitting pull requests, please make sure the code you contribute follows the editorconfig settings and adheres in jshint lintings. Make sure there are tests for the behavior as well.

## Why Make This Generator?

I made this generator initially for my college mates who wanted to set up a Jekyll blog for their projects on a specific class (that I took with them as well). Rather than copying a base from a commit reference of my own blog, might as well write a Yeoman generator for it. This is my first attempt in making a Yeoman generator and making tests for it as well. Hopefully I did well.

## License

MIT
