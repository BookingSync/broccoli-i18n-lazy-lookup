var Filter = require('broccoli-filter');

function I18nLazyLookup (inputTree, options) {
  if (!(this instanceof I18nLazyLookup)) return new I18nLazyLookup(inputTree, options);

  Filter.call(this, inputTree, options); // this._super()

  options = options || {};

  this.inputTree   = inputTree;
  this.description = options.description;
};
I18nLazyLookup.prototype = Object.create(Filter.prototype);
I18nLazyLookup.prototype.constructor = I18nLazyLookup;

I18nLazyLookup.prototype.canProcessFile = function (relativePath) {
  var extension = this.pathExtension(relativePath);

  if (extension === 'js' || extension === 'hbs') {
    return true;
  } else {
    return null;
  }
}

I18nLazyLookup.prototype.getDestFilePath = function(relativePath) {
  return relativePath;
};

I18nLazyLookup.prototype.pathExtension = function(relativePath) {
  var tmp = relativePath.toString().split('.');
  return tmp[tmp.length - 1];
};

I18nLazyLookup.prototype.processString = function (str, relativePath) {
  var extension = this.pathExtension(relativePath);
  var pathChunks = relativePath.split('.')[0].split('/');
  var prefix;

  // Remove app-name and templates/controllers/components prefix
  pathChunks.shift();
  pathChunks.shift();

  // Ignore dash prefix for partial templates
  if (pathChunks[pathChunks.length - 1].charAt(0) === "-") {
    pathChunks[pathChunks.length - 1] = pathChunks[pathChunks.length - 1].substring(1);
  }

  prefix = pathChunks.join('.');

  if (extension === 'js') {
    return this.processLazyLookup(str, prefix, '[a-z]Translation:\\s*[\'"](\\.[\\w-\\.]+)[\'"]');
  } else if (extension === 'hbs') {
    str = this.processLazyLookup(str, prefix, '[a-z]Translation\\s*=\\s*[\'"](\\.[\\w-\\.]+)[\'"]');
    return this.processLazyLookup(str, prefix, '{{\\s*t\\s*[\'"](\\.[\\w-\\.]+)[\'"]');
  } else {
    return str;
  }
};

I18nLazyLookup.prototype.processLazyLookup = function(str, prefix, regexp) {
  var matches = str.match(new RegExp(regexp, 'g')) || [];
  var match;
  var matchedString;
  var finalString;
  var i18nKey;

  for (var i = 0; matches[i]; ++i) {
    match = matches[i].match(new RegExp(regexp));

    matchedString = match[0];
    i18nKey = prefix + match[1];
    finalString = matchedString.replace(match[1], i18nKey);

    str = str.replace(matchedString, finalString);
  }

  return str;
};

module.exports = I18nLazyLookup;
