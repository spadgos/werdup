var dictionary = require('./dictionary'),
    _ = require('lodash');

module.exports = {
  check,
  getWordsOfLength
};

function check(word) {
  if (!word || !dictionary[word.length]) {
    return false;
  }

  const len = word.length,
        words = dictionary[len],
        numWords = words.length / len;

  var low = 0,
      high = numWords - 1,
      mid = Math.floor(numWords / 2),
      found;

  while (high >= low) {
    found = words.substr(len * mid, len);
    if (word === found) {
      return true;
    }
    if (word < found) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
    mid = Math.floor((low + high) / 2);
  }
  return false;
}

function getWordsOfLength(len, containing) {
  var list = dictionary[len].match(new RegExp(_.repeat('.', len), 'g')),
      re;
  if (containing && /[a-z]/i.test(containing)) {
    re = new RegExp(containing.replace(/[^.a-z]/ig, ''), 'i');
    list = list.filter(re.test, re);
  }
  return list;
}
