"use strict";

var assert = require('assert');
var splitLimit = require('../index');

var str = 'user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64';
var str2 = 'apple - pear  -  melon - banana';
var str3 = 'apple *-* pear  .+.  melon ^-^ banana';

describe('RegExp separator: ', function() {
  it('Split with RegExp correctly', function() {
    assert.deepEqual(splitLimit(str, /:\s+/, -1), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, 0), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, 1), ['user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, 2), ['user-agent', 'Mozilla/5.0, OS: Mac, Arch:  amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, 3), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch:  amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, 4), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, 5), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
  });
});

describe('String separator: ', function() {
  it('Split with String correctly', function() {
    assert.deepEqual(splitLimit(str, ': ', -1), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
    assert.deepEqual(splitLimit(str, ': ', 0), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
    assert.deepEqual(splitLimit(str, ': ', 1), ['user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64']);
    assert.deepEqual(splitLimit(str, ': ', 2), ['user-agent', 'Mozilla/5.0, OS: Mac, Arch:  amd64']);
    assert.deepEqual(splitLimit(str, ': ', 3), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch:  amd64']);
    assert.deepEqual(splitLimit(str, ': ', 4), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
    assert.deepEqual(splitLimit(str, ': ', 5), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', ' amd64']);
  });
});

describe('separator with undefined or null: ', function() {
  it('separator with undefined or null correctly', function() {
    assert.deepEqual(splitLimit(str, /:\s+/), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
    assert.deepEqual(splitLimit(str, /:\s+/, null), ['user-agent', 'Mozilla/5.0, OS', 'Mac, Arch', 'amd64']);
  });
});

// test with groups
describe('RegExp separator with groups but drop submatches: ', function() {
  it('Split with RegExp groups but drop submatches correctly', function() {
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, -1), ['apple', 'pear', 'melon', 'banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 0), ['apple', 'pear', 'melon', 'banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 1), ['apple - pear  -  melon - banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 2), ['apple', 'pear  -  melon - banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 3), ['apple', 'pear', 'melon - banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 4), ['apple', 'pear', 'melon', 'banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 5), ['apple', 'pear', 'melon', 'banana']);
  });
});

describe('RegExp separator with groups and keep submatches: ', function() {
  it('Split with RegExp groups and keep submatches correctly', function() {
    var options = {
      isKeepSubmatches: true
    };
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, -1, options), ['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 0, options), ['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 1, options), ['apple - pear  -  melon - banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 2, options), ['apple', '-', 'pear  -  melon - banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 3, options), ['apple', '-', 'pear', '-', 'melon - banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 4, options), ['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
    assert.deepEqual(splitLimit(str2, /\s*(-)\s*/, 5, options), ['apple', '-', 'pear', '-', 'melon', '-', 'banana']);
  });
});

describe('RegExp separator contains multiple groups and keep submatches: ', function() {
  it('Split with RegExp contains multiple groups and keep submatches correctly', function() {
    var options = {
      isKeepSubmatches: true
    };
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, -1, options), ['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, 0, options), ['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, 1, options), ['apple *-* pear  .+.  melon ^-^ banana']);
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, 2, options), ['apple', '*', '-', '*', 'pear  .+.  melon ^-^ banana']);
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, 3, options), ['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon ^-^ banana']);
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, 4, options), ['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
    assert.deepEqual(splitLimit(str3, /\s*([^-+])([-+])([^-+])\s*/, 5, options), ['apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon', '^', '-', '^', 'banana']);
  });
});
