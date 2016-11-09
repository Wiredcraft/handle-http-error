'use strict';

var nock = require('nock');

module.exports = mock;

function mock(host, options) {

  return nock(host, options)

  // Non-errors.
  .get('/200')
    .reply(200, { data: { id: 200 } })

  .get('/error')
    .replyWithError('Application Error')

  // Get. Typical errors: 404, 500.
  .get('/null/404')
    .reply(404)

  .get('/null/500')
    .reply(500)

  .get('/string/404')
    .reply(404, '404 Not Found')

  .get('/string/500')
    .reply(500, '500 Internal Server Error')

  .get('/object/404')
    .reply(404, { statusCode: 404, code: 40400, message: '404 Not Found' })

  .get('/object/500')
    .reply(500, { statusCode: 500, code: 50000, message: '500 Internal Server Error' })

  .get('/nested/404')
    .reply(404, { error: { statusCode: 404, code: 40400, message: '404 Not Found' } })

  .get('/nested/500')
    .reply(500, { error: { statusCode: 500, code: 50000, message: '500 Internal Server Error' } })

  // Post. Typical errors: 400, 409, 500
  .post('/null', { data: { id: '400' } })
    .reply(400)

  .post('/null', { data: { id: '409' } })
    .reply(409)

  .post('/null', { data: { id: '500' } })
    .reply(500)

  .post('/string', { data: { id: '400' } })
    .reply(400, '400 Bad Request')

  .post('/string', { data: { id: '409' } })
    .reply(409, '409 Conflict')

  .post('/string', { data: { id: '500' } })
    .reply(500, '500 Internal Server Error')

  .post('/object', { data: { id: '400' } })
    .reply(400, { statusCode: 400, code: 40000, message: '400 Bad Request' })

  .post('/object', { data: { id: '409' } })
    .reply(409, { statusCode: 409, code: 40900, message: '409 Conflict' })

  .post('/object', { data: { id: '500' } })
    .reply(500, { statusCode: 500, code: 50000, message: '500 Internal Server Error' })

  .post('/nested', { data: { id: '400' } })
    .reply(400, { error: { statusCode: 400, code: 40000, message: '400 Bad Request' } })

  .post('/nested', { data: { id: '409' } })
    .reply(409, { error: { statusCode: 409, code: 40900, message: '409 Conflict' } })

  .post('/nested', { data: { id: '500' } })
    .reply(500, { error: { statusCode: 500, code: 50000, message: '500 Internal Server Error' } })

  .persist();

};
