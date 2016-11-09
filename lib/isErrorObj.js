'use strict';

const notObjectOrIsEmpty = require('not-empty-object').notObjectOrIsEmpty;

module.exports = isErrorObj;

/**
 * .
 */
function isErrorObj(val) {
  if (notObjectOrIsEmpty(val)) {
    return false;
  }
  const type = typeof val.message;
  if (type === 'string' || type === 'number') {
    return val;
  }
  return false;
}
