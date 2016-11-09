'use strict';

const notObjectOrIsEmpty = require('not-empty-object').notObjectOrIsEmpty;

module.exports = buildFinder;

/**
 * .
 */
function buildFinder(matcher) {

  /**
   * .
   */
  function finder(possibleKeys) {
    if (possibleKeys != null && !Array.isArray(possibleKeys)) {
      possibleKeys = [possibleKeys];
    }

    /**
     * .
     */
    function find(data, key) {
      let res;
      // Found.
      if (res = matcher(data, key)) {
        return res;
      }
      // Can be an array.
      if (Array.isArray(data)) {
        // Recursion.
        for (let attr of data) {
          if (res = find(attr, key)) {
            return res;
          }
        }
      }
      // Require an object from here.
      if (notObjectOrIsEmpty(data)) {
        return false;
      }
      // Recursion.
      let keys = (possibleKeys == null) ? Object.keys(data) : possibleKeys;
      for (let key of keys) {
        if (res = find(data[key], key)) {
          return res;
        }
      }
      // Not found.
      return false;
    }
    return find;
  }
  return finder;
}
