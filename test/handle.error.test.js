'use strict';

require('should');
const nock = require('nock');

const request = require('request-promise').defaults({ json: true });

const buildHandler = require('../');
const mock = require('./mock');
const host = 'http://localhost/api';

describe('Handle error response', () => {

  before(() => {
    nock.cleanAll();
    mock(host);
  });

  after(() => {
    nock.cleanAll();
  });

  describe('With `request-promise`', () => {

    let handler;

    it('build a simple handler', () => {
      handler = buildHandler();
      handler.should.be.Function();
    });

    it('can handle null message', () => {
      return request.get(`${host}/null/404`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', '404 - undefined');
      });
    });

    it('can handle null message', () => {
      return request.get(`${host}/null/500`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', '500 - undefined');
      });
    });

    it('can handle string message', () => {
      return request.get(`${host}/string/404`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', '404 - "404 Not Found"');
      });
    });

    it('can handle string message', () => {
      return request.get(`${host}/string/500`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', '500 - "500 Internal Server Error"');
      });
    });

    it('can handle object message', () => {
      return request.get(`${host}/object/404`).catch(handler).then(() => {
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
      return request.get(`${host}/object/500`).catch(handler).then(() => {
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
      return request.get(`${host}/nested/404`).catch(handler).then(() => {
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
      return request.get(`${host}/nested/500`).catch(handler).then(() => {
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

  describe('With `request-promise` and overrides', () => {

    let handler;

    it('build a handler with overrides', () => {
      handler = buildHandler({
        type: 'application'
      });
      handler.should.be.Function();
    });

    it('can handle null message', () => {
      return request.get(`${host}/null/404`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', '404 - undefined');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle null message', () => {
      return request.get(`${host}/null/500`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', '500 - undefined');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle string message', () => {
      return request.get(`${host}/string/404`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', '404 - "404 Not Found"');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle string message', () => {
      return request.get(`${host}/string/500`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', '500 - "500 Internal Server Error"');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle object message', () => {
      return request.get(`${host}/object/404`).catch(handler).then(() => {
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
      return request.get(`${host}/object/500`).catch(handler).then(() => {
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
      return request.get(`${host}/nested/404`).catch(handler).then(() => {
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
      return request.get(`${host}/nested/500`).catch(handler).then(() => {
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
