'use strict';

module.exports = isErrorCode;

/**
 * .
 */
function isErrorCode(val) {
  if (!Number.isInteger(val)) {
    val = Number.parseInt(val, 10);
  }
  return 400 <= val && val < 600 && val;
}
