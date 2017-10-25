'use strict';

require('should');
const nock = require('nock');
global.Promise = require('bluebird');

require('isomorphic-fetch');

const buildHandler = require('../');
const mock = require('./mock');
const host = 'http://localhost/api';

function parseJSON(res) {
  return res.json().then((body) => {
    return [res, body];
  }).catch((err) => {
    return res.text().then((body) => {
      return [res, body];
    }).catch((err) => {
      return [res];
    });
  });
}

describe('Handle response', () => {

  before(() => {
    nock.cleanAll();
    mock(host);
  });

  after(() => {
    nock.cleanAll();
  });

  describe('With `fetch`', () => {

    let handler;

    it('build a simple handler', () => {
      handler = buildHandler();
      handler.should.be.Function();
    });

    it('would not handle non-error', () => {
      return fetch(`${host}/200`).then(parseJSON).spread(handler).spread((res, body) => {
        body.should.deepEqual({ data: { id: 200 } });
      });
    });

    it('would not handle non-http-error', () => {
      return fetch(`${host}/error`).catch(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        err.should.be.Error();
        err.should.not.have.property('statusCode');
        err.should.have.property('message',
          'request to http://localhost/api/error failed, reason: Application Error');
      });
    });

    it('can handle null message', () => {
      return fetch(`${host}/null/404`).then(parseJSON).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', 'Not Found');
      });
    });

    it('can handle null message', () => {
      return fetch(`${host}/null/500`).then(parseJSON).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', 'Internal Server Error');
      });
    });

    it('can handle string message', () => {
      return fetch(`${host}/string/404`).then(parseJSON).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', 'Not Found');
      });
    });

    it('can handle string message', () => {
      return fetch(`${host}/string/500`).then(parseJSON).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', 'Internal Server Error');
      });
    });

    it('can handle object message', () => {
      return fetch(`${host}/object/404`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/object/500`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/nested/404`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/nested/500`).then(parseJSON).spread(handler).then(() => {
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

  describe('With `fetch` and overrides', () => {

    let handler;

    it('build a handler with overrides', () => {
      handler = buildHandler({
        type: 'application'
      });
      handler.should.be.Function();
    });

    it('can handle null message', () => {
      return fetch(`${host}/null/404`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/null/500`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/string/404`).then(parseJSON).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 404);
        err.should.have.property('message', 'Not Found');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle string message', () => {
      return fetch(`${host}/string/500`).then(parseJSON).spread(handler).then(() => {
        throw new Error('expected an error');
      }, (err) => {
        // console.log(err);
        err.should.be.Error();
        err.should.have.property('statusCode', 500);
        err.should.have.property('message', 'Internal Server Error');
        err.should.have.property('type', 'application');
      });
    });

    it('can handle object message', () => {
      return fetch(`${host}/object/404`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/object/500`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/nested/404`).then(parseJSON).spread(handler).then(() => {
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
      return fetch(`${host}/nested/500`).then(parseJSON).spread(handler).then(() => {
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
