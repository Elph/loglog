require('./testdom')('<html><body></body></html>');

var assert = require("assert"),
    should = require("should"),
    LogLog = require('../src/index.js');


describe('LogLog', function(){
    describe('#.ctor()', function(){
        it('should return a valid instance of LogLog', function(){

            var o = new LogLog('prefix');

            // assert
            should.exists(o);
        })
    })
})