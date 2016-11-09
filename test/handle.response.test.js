'use strict';

require('should');
const nock = require('nock');
const Promise = require('bluebird');

const request = Promise.promisify(require('request').defaults({ json: true }), { multiArgs: true });
Promise.promisifyAll(request, { multiArgs: true });

const buildHandler = require('../');
const mock = require('./mock');
const host = 'http://localhost/api';

describe('Handle response', () => {

  before(() => {
    nock.cleanAll();
    mock(host);
  });

  after(() => {
    nock.cleanAll();
  });

  describe('With `request`', () => {

    let handler;

    it('build a simple handler', () => {
      handler = buildHandler();
      handler.should.be.Function();
    });

    it('would not handle non-error', () => {
      return request.getAsync(`${host}/200`).spread(handler).spread((res, body) => {
        body.should.deepEqual({ data: { id: 200 } });
      });
    });

    it('would not handle non-http-error', () => {
      return request.getAsync(`${host}/error`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        err.should.be.Error();
        err.should.not.have.property('statusCode');
        err.should.have.property('message', 'Application Error');
      });
    });

    it('can handle null message', () => {
      return request.getAsync(`${host}/null/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', 'Not Found');
      });
    });

    it('can handle null message', () => {
      return request.getAsync(`${host}/null/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', 'Internal Server Error');
      });
    });

    it('can handle string message', () => {
      return request.getAsync(`${host}/string/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', '404 Not Found');
      });
    });

    it('can handle string message', () => {
      return request.getAsync(`${host}/string/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', '500 Internal Server Error');
      });
    });

    it('can handle object message', () => {
      return request.getAsync(`${host}/object/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('code', 40400);
        err.should.have.property('message', '404 Not Found');
      });
    });

    it('can handle object message', () => {
      return request.getAsync(`${host}/object/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('code', 50000);
        err.should.have.property('message', '500 Internal Server Error');
      });
    });

    it('can handle nested message', () => {
      return request.getAsync(`${host}/nested/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('code', 40400);
        err.should.have.property('message', '404 Not Found');
      });
    });

    it('can handle nested message', () => {
      return request.getAsync(`${host}/nested/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('code', 50000);
        err.should.have.property('message', '500 Internal Server Error');
      });
    });

  });

  describe('With `request` and overrides', () => {

    let handler;

    it('build a handler with overrides', () => {
      handler = buildHandler({
        type: 'application'
      });
      handler.should.be.Function();
    });

    it('can handle null message', () => {
      return request.getAsync(`${host}/null/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', 'Not Found');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle null message', () => {
      return request.getAsync(`${host}/null/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', 'Internal Server Error');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle string message', () => {
      return request.getAsync(`${host}/string/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', '404 Not Found');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle string message', () => {
      return request.getAsync(`${host}/string/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', '500 Internal Server Error');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle object message', () => {
      return request.getAsync(`${host}/object/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('code', 40400);
        err.should.have.property('message', '404 Not Found');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle object message', () => {
      return request.getAsync(`${host}/object/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('code', 50000);
        err.should.have.property('message', '500 Internal Server Error');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle nested message', () => {
      return request.getAsync(`${host}/nested/404`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('code', 40400);
        err.should.have.property('message', '404 Not Found');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle nested message', () => {
      return request.getAsync(`${host}/nested/500`).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('code', 50000);
        err.should.have.property('message', '500 Internal Server Error');
        err.should.have.property('type', 'application');
      });
    });

  });

});
