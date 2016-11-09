'use strict';

require('should');

const buildFinder = require('../lib/buildFinder');
const isErrorCode = require('../lib/isErrorCode');

describe('findErrorCode()', function() {
  let findErrorCode;

  it('can be built', function() {
    findErrorCode = buildFinder(isErrorCode);
    findErrorCode.should.be.Function();
  });

  it('can find from a valid error code', function() {
    findErrorCode()(404).should.equal(404);
  });

  it('cannot find from an invalid error code', function() {
    findErrorCode()(200).should.equal(false);
  });

  it('can find from a valid object', function() {
    findErrorCode()({ code: 404 }).should.equal(404);
  });

  it('cannot find from an invalid object', function() {
    findErrorCode()({ code: 200 }).should.equal(false);
  });

  it('can find with valid keys', function() {
    findErrorCode('code')({ code: 404 }).should.equal(404);
  });

  it('cannot find with invalid keys', function() {
    findErrorCode('lorem')({ code: 404 }).should.equal(false);
  });

  it('can find with valid keys', function() {
    findErrorCode(['lorem', 'code'])({ code: 404 }).should.equal(404);
  });

  it('cannot find with invalid keys', function() {
    findErrorCode(['lorem'])({ code: 404 }).should.equal(false);
  });

  it('can find from a valid array', function() {
    findErrorCode()([{ code: 404 }, {}]).should.equal(404);
  });

  it('cannot find from an invalid array', function() {
    findErrorCode()([{ code: 200 }, {}]).should.equal(false);
  });

  it('cannot find from an invalid array', function() {
    findErrorCode()([{ code: 200 }, {}]).should.equal(false);
  });

  it('can find from a valid array', function() {
    findErrorCode()([{}, { code: 404 }]).should.equal(404);
  });

  it('cannot find from an invalid array', function() {
    findErrorCode()([{}, { code: 200 }]).should.equal(false);
  });

  it('cannot find from an invalid array', function() {
    findErrorCode()([{}, { code: 200 }]).should.equal(false);
  });

  it('can find from a valid array and keys', function() {
    findErrorCode('code')([{}, { code: 404 }]).should.equal(404);
  });

  it('cannot find from an invalid array and', function() {
    findErrorCode('lorem')([{}, { code: 404 }]).should.equal(false);
  });

  it('can find from a valid array and keys', function() {
    findErrorCode(['lorem', 'code'])([{}, { code: 404 }]).should.equal(404);
  });

  it('cannot find from an invalid array and keys', function() {
    findErrorCode(['lorem'])([{}, { code: 404 }]).should.equal(false);
  });

  // it('description', function() {
  //   const obj = { lorem: true };
  //   obj.obj = obj;
  //   findErrorCode()(obj).should.equal(false);
  // });

  it('description', function() {
    const error = new Error();
    error.code = 404;
    findErrorCode()(error).should.equal(404);
  });

  it('description', function() {
    const error = new Error();
    error.code = 404;
    findErrorCode('code')(error).should.equal(404);
  });

  it('description', function() {
    const error = new Error();
    error.code = 404;
    findErrorCode()([{}, error]).should.equal(404);
  });

  it('description', function() {
    const error = new Error();
    error.code = 404;
    findErrorCode('code')(error).should.equal(404);
  });

  it('description', function() {
    const error = new Error();
    error.code = 404;
    findErrorCode('code')([{}, error]).should.equal(404);
  });

});
