# Handle HTTP Error

[![Build Status](https://travis-ci.org/Wiredcraft/handle-http-error.svg?branch=master)](https://travis-ci.org/Wiredcraft/handle-http-error) [![Coverage Status](https://coveralls.io/repos/github/Wiredcraft/handle-http-error/badge.svg?branch=master)](https://coveralls.io/github/Wiredcraft/handle-http-error?branch=master)

Handle a few common cases when an HTTP request got an error.

## How to use

```js
// The module exports a builder function.
const buildHandler = require('handle-http-error');

// The builder can build an error handler. The `overrides` is an optional object, and if provided,
// will be merged into the result error instance, overriding any conflicts.
const handler = buildHandler(overrides);

// The handler is a function that can be used to parse HTTP responses or errors, and it will throw an
// HTTP error (with the module `http-errors`) if it sees an error or an HTTP response with status 4xx
// or 5xx. For examples (see the use cases and the tests for more complete examples):
handler(error);
handler(res, body);

// The handler can look into the arguments and try to find an object that looks like an error, and
// merge the attributes into the result error. For example this would throw an error with an attribute
// `code: 40400`:
handler(res, { error: { statusCode: 404, code: 40400, message: '404 Not Found' } });
```

## Use cases

### Request + Bluebird

```js
const request = require('request').defaults({ json: true });
require('bluebird').promisifyAll(request, { multiArgs: true });

const handler = require('handle-http-error')({
  type: 'application'
});

// When it responses 2xx.
request.getAsync(someUrl).spread(handler).spread((res, body) => {
  // ...
});

// When it responses 404.
request.getAsync(someUrl).spread(handler).then(() => {
  throw new Error('expected an error');
}, (err) => {
  err.should.be.Error();
  err.should.have.property('statusCode', 404);
  err.should.have.property('message', '404 Not Found');
  err.should.have.property('type', 'application');
});

// When it responses 404 and custom informations with HTML body (like `{ error: { statusCode: 404,
// code: 40400, message: '404 Not Found' } }`).
return request.getAsync(someUrl).spread(handler).then(() => {
  throw new Error('expected an error');
}, (err) => {
  err.should.be.Error();
  err.should.have.property('statusCode', 404);
  err.should.have.property('code', 40400);
  err.should.have.property('message', '404 Not Found');
  err.should.have.property('type', 'application');
});
```
