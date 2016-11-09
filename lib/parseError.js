'use strict';

const sliced = require('sliced');
const notObjectOrIsEmpty = require('not-empty-object').notObjectOrIsEmpty;

const buildFinder = require('./buildFinder');
const isErrorObj = require('./isErrorObj');
const isErrorCode = require('./isErrorCode');

module.exports = parseError;

parseError.findErrorCode = buildFinder(isErrorCode)(['statusCode', 'status']);
parseError.findErrorObj = buildFinder(isErrorObj)(['body', 'error', 'errors']);

/**
 * See if the response has a status error code, and if the error message has an error-like object.
 */
function parseError(res, body) {
  // Res is optional.
  if (body == null) {
    body = res;
  }
  // Status code is required.
  const status = parseError.findErrorCode(sliced(arguments));
  if (!status) {
    return false;
  }
  // Body can have an error-like object, in which case the attributes will be used.
  const obj = findErrorObj(body);
  if (obj) {
    body = Object.assign(body, obj);
  }
  return [status, body];
}

/**
 * See if the data has an attribute (any level, and not the data itself) that looks like an error
 * object.
 */
function findErrorObj(data) {
  if (notObjectOrIsEmpty(data)) {
    return false;
  }
  // Only the attributes, not the data itself.
  for (let key in data) {
    let attr = data[key];
    const found = parseError.findErrorObj(attr);
    if (found) {
      return found;
    }
  }
  // Not found.
  return false;
}
