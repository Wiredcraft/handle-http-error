'use strict';

const sliced = require('sliced');
const httpError = require('http-errors');
const notEmptyObject = require('not-empty-object').notEmptyObject;

module.exports = buildHandler;

// Parse the given error.
// Default to a simple parser that handles a few common cases.
buildHandler.parseError = require('./parseError');

// Build an error with the status and message etc.
// Default to `http-errors`.
buildHandler.buildError = httpError;

/**
 * Build a handler.
 *
 * @param {Object} overrides override the error attributes
 * @return {Function} the handler
 */
function buildHandler(overrides) {
  const parseError = buildHandler.parseError;
  const buildError = buildHandler.buildError;

  /**
   * .
   */
  return function handler(error) {
    const found = parseError.apply(this, arguments);
    if (!found) {
      if (error instanceof Error) {
        Error.captureStackTrace(error, handler);
        throw error;
      }
      return sliced(arguments);
    }
    error = buildError.apply(this, found);
    if (notEmptyObject(overrides)) {
      Object.assign(error, overrides);
    }
    Error.captureStackTrace(error, handler);
    throw error;
  };
}
