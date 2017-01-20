/**
 *
 * splits a String into an array of substrings, and limit split times.
 * but unlike String.prototype.split(), the last substring will be the unsplit remainder,
 * and it is more like ruby's split, php's explode/preg_split, golang's strings.SplitN function
 *
 * by jesse<xiangaoji@gmail.com>
 *
 * */
"use strict";

module.exports = splitLimit;

function splitLimit(string, separator, limit, options) {
  var isReg = Object.prototype.toString.call(separator) === '[object RegExp]';
  var size = parseInt(limit, 10);
  var optional = options || {}; // using optional to determal submatches actor like js/ruby/perl or php/golang
  var startPosition = 0;
  var prevMatchedSize = 0;
  var resultSize = 0;
  var result = [];
  if (typeof string !== 'string') {
    string = '' + string;
  }
  if (typeof limit === 'undefined' || limit === null || isNaN(size)) {
    return string.split(separator);
  }
  if (!isReg) { // separator is string
    var splited = string.split(separator);
    if (size <= 0 || size >= splited.length) {
      return splited;
    }
    result = splited.slice(0, size - 1);
    result.push(splited.slice(size - 1).join(separator));
    return result;
  }
  if (!separator.global) { // convert to global match
    separator = new RegExp(separator.source, separator.flags !== undefined ? separator.flags : ('g' + (separator.multiline ? 'm' : '') + (separator.ignoreCase ? 'i' : '')));
  }
  string.replace(separator, function() {
    var args = Array.prototype.slice.call(arguments); // or es6 [...arguments]
    var matched = args[0]; // the whole matched
    var position = args[args.length - 2];
    if (resultSize < size - 1 || size <= 0) {
      result.push(string.substring(startPosition + prevMatchedSize, position));
      prevMatchedSize = matched.length;
      startPosition = position;
      resultSize++;
      if (optional.isKeepSubmatches) { // and the submatched
        var submatches = args.slice(1, args.length - 2);
        for (var i = 0; i < submatches.length; i++) {
          result.push(submatches[i]);
        }
      }
    }
  });
  result.push(string.substring(startPosition + prevMatchedSize));
  return result;
}
