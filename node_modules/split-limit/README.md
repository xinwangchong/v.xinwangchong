### split-limit
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

Splits a string into limited length of substrings, but keep last substring unsplit.

> Splits a String into an array of substrings, by passing parameter `limit`, only divide limit-1 times.
> and unlike String.prototype.split(), the last substring will be the unsplit remainder.
> it is more like ruby's split, php's explode/preg_split, golang's strings.SplitN/Regexp.Split function

### Syntax
```
function splitLimit(string, separator, [limit = undefined], [options = {isKeepSubmatches: false} ]) {

}
```
### Parameters
>#### string `String`
> the string need to be split
>#### separator `String|RegExp`
> if separator is a RegExp, string is divided where the separator regexp matches,
> and if separator regexp contains groups, the last parameter `options` will decide how to treat submatches
>#### *limit* `Integer` (Optional)
> Optional Integer specifying a limit on the number of splits to be found,
> unlike String.prototype.split(), it will only split `limit-1` times (if limit is >= 1), normally it will return limit size array of substrings.
> if not set or set to null or set to isNaN, is equivalent to String.prototype.split()
> if set to <= 0, it will split all matched.(means there is no limited)
>#### *options* `Object`  (Optional)
>decides to ignore or keep submatches while separator is a regexp and contains groups.
> if options is not been set or set to {isKeepSubmatches: false}, then submatches will be dropped. like php/golang does.
> if options is set to {isKeepSubmatches: true}, then submatches will be returned in the result array, followed after split value
> and the result array size maybe large than limit, like js/ruby/perl does (unless you know it exactly, otherwise just ignore it).

### Usage
``` js
var splitLimit = require('split-limit');
var str = 'user-agent: Mozilla/5.0, OS: Mac, Arch:  amd64';

var splits = splitLimit(str, /:\s+/, 2);
// ==> [ 'user-agent', 'Mozilla/5.0, OS: Mac, Arch:  amd64' ]


// separator is regexp and contains groups
var str2 = 'apple *-* pear  .+.  melon ^-^ banana';
var splits2 = splitLimit(str2, /\s*([^-+])([-+])([^-+])\s*/, 3);
// ==> [ 'apple', 'pear', 'melon ^-^ banana' ]

// keep the submatches
var splits2_keep = splitLimit(str2, /\s*([^-+])([-+])([^-+])\s*/, 3, {
  isKeepSubmatches: true
});
// ==> [ 'apple', '*', '-', '*', 'pear', '.', '+', '.', 'melon ^-^ banana' ]


// split with string
// limit <=0 will split with all matched substrings.
splitLimit('write|read|create|lock', '|', -1);
// ==> [ 'write', 'read', 'create', 'lock' ]

// split with regexp and limit is -1, unlike String.prototype.split(), it ignored submatches!
splitLimit('apple - pear  -  melon - banana', /\s*(-)\s*/, -1);
// ==> ['apple', 'pear', 'melon', 'banana']
// if you want to keep submatches like String.prototype.split(), set options to {isKeepSubmatches: true}
```

Enjoy!
#### License
MIT © [Jesse](http://www.jianshu.com/users/e1e48224c7f1/)

[npm-url]: https://npmjs.org/package/split-limit
[npm-image]: https://img.shields.io/npm/v/split-limit.svg?style=flat-square

[travis-url]: https://travis-ci.org/jesseky/split-limit
[travis-image]: https://img.shields.io/travis/jesseky/split-limit.svg?style=flat-square
