var assert = require('assert'),
    should = require('should'),
    sinon = require('sinon'),
    LogLog = require('../src/index.js');


describe('creating a new logger', function(){
    it('should return a valid instance of LogLog', function(){
        var logger = new LogLog();
        should.exists(logger);
        should(logger.prefix).not.be.ok;
    });
});

describe('creating a logger with a prefix', function(){

    var logger = new LogLog('myPrefix');
    it('should return a valid prefix', function(){
        should.exists(logger);
        should(logger).have.property('prefix');
        should(logger.prefix).be.ok;
        should(logger.prefix).eql('myPrefix');
    });

    if(!LogLog.isConsoleColoredSupported()) {
        it('should  not return a color if not supported', function () {
            should(logger.prefixColor).not.be.ok;
        });
    } else {
        it('should return a color if supported', function () {
            should(logger.prefixColor).be.ok;
            should(logger.prefixColor).be.String;
        });
    }


    //it('getAllPrefixes should return only the two created (*, myPrefix)', function(){
    //    var prefixes = LogLog.getAllPrefixes();
    //    should(prefixes.length).eql(2);
    //    should(prefixes[1]).eql('*');
    //    should(prefixes[0]).eql('myPrefix');
    //});
});


describe('calling Logger Methods', function(){

    var logger = new LogLog('TestLogger');
    var methods = ['log', 'debug', 'info', 'warn', 'error'];

    methods.forEach(function(method) {
        it(method + ' should behave as expected', function(){
            var spy = sinon.spy(logger, method);
            var message = 'Logging ' + method;
            spy.withArgs(message);
            logger[method].call(logger, message);
            assert(spy.withArgs(message).calledOnce);
        });
    });

});
