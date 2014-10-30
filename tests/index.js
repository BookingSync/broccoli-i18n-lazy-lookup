'use strict';

var replace = require('..');
var expect = require('expect.js');

var fs = require('fs');
var broccoli = require('broccoli');

var builder;

describe('broccoli-i18n-lazy-lookup', function() {
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it("can use lazy lookup in controllers' ...Translation function", function() {
    expect(1);

    var sourcePath = 'tests/fixtures/dummy/';
    var tree = replace(sourcePath);

    builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(dir + '/app/controllers/matched-controller-file.js',
        { encoding: 'utf8'});
      var expected = 'function() {\n  nameTranslation: \'matched-controller-file.name\';\n}();\n';

      expect(actual).to.equal(expected);
    });
  })

  it('can use lazy lookup in handlebar templates', function() {
    expect(1);

    var sourcePath = 'tests/fixtures/dummy';
    var tree = replace(sourcePath);

    builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(dir + '/app/templates/matched-template-file.hbs',
        { encoding: 'utf8'});
      var expected = '<h1>{{t \'matched-template-file.lazy_lookup\'}}</h1>\n';

      expect(actual).to.equal(expected);
    });
  })

  it("can use lazy lookup in nested controllers' ...Translation function", function() {
    expect(1);

    var sourcePath = 'tests/fixtures/dummy';
    var tree = replace(sourcePath);

    builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(dir + '/app/controllers/posts/matched-controller-file.js',
        { encoding: 'utf8'});
      var expected = 'function() {\n' +
                     '  titleTranslation: \'posts.matched-controller-file.title\';\n' +
                     '  commentsTranslation: \'posts.matched-controller-file.comments\';\n' +
                     '}();\n';

      expect(actual).to.equal(expected);
    });
  })

  it('can use lazy lookup in nested handlebar templates', function() {
    expect(1);

    var sourcePath = 'tests/fixtures/dummy';
    var tree = replace(sourcePath);

    builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(dir + '/app/templates/posts/matched-template-file.hbs',
        { encoding: 'utf8'});
      var expected = '<h1>{{t \'posts.matched-template-file.lazy_lookup\'}}</h1>\n' +
                     '<p>{{t \'posts.matched-template-file.description\'}}</p>\n';

      expect(actual).to.equal(expected);
    });
  })
});
