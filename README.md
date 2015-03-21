# Broccoli's I18n Lazy Lookup

[![Build Status](https://travis-ci.org/BookingSync/broccoli-i18n-lazy-lookup.svg?branch=master)](https://travis-ci.org/BookingSync/broccoli-i18n-lazy-lookup)

## Summary

Broccoli's I18n Lazy Lookup is made to add support for lazy lookup in [Ember I18n](https://github.com/jamesarosen/ember-i18n). This Broccoli filter is best used with [ember-cli-i18n-lazy-lookup](https://www.github.com/BookingSync/ember-cli-i18n-lazy-lookup).

The concept is to automatically prefix your I18n key using the current file path.
To do so, start your translation key by a `.` and it will replaced by the current file path.

## Examples

### In controllers and components

within `app/controllers/posts/edit.js`
```javascript
nameTranslation: '.name'
```

it will get converted to:
```javascript
nameTranslation: 'posts.edit.name'
```

### In templates

within `app/templates/posts/edit.hbs`
```hbs
{{t '.save'}}
```

will get converted to:
```hbs
{{t 'posts.edit.save'}}
```

but also `app/templates/posts/edit.hbs`
```hbs
{{input author as="select"
    collection="controller.authors"
    selection="controller.post.author"
    optionLabelPath="content.name"
    promptTranslation=".select_author"
  }}
```

will get converted to:
```
{{input author as="select"
    collection="controller.authors"
    selection="controller.post.author"
    optionLabelPath="content.name"
    promptTranslation="posts.edit.select_author"
  }}
```

In partial templates, the prefixing dash will be ignored when generating the translation key, so within `app/templates/post/-form.hbs`
```hbs
{{t '.submit'}}
```

will get converted to:
```hbs
{{t 'posts.form.submit'}}
```

## Installation

```shell
npm install --save-dev broccoli-i18n-lazy-lookup
```

Note: For Ember CLI installation, please check [ember-cli-i18n-lazy-lookup](https://www.github.com/BookingSync/ember-cli-i18n-lazy-lookup).

## Usage

Assuming installation via NPM, you can use broccoli-i18n-lazy-lookup in your `Brocfile.js` like this:

```javascript
var filterI18nLazyLookup = require('broccoli-i18n-lazy-lookup');
tree = filterI18nLazyLookup(tree);
```

Note: To use with Ember CLI, please check [ember-cli-i18n-lazy-lookup](https://www.github.com/BookingSync/ember-cli-i18n-lazy-lookup) instead.

## Tests

Running the tests:

```javascript
npm install
npm test
```

## License

This project is distributed under the MIT license.
