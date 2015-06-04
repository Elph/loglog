var $   = require( '../../node_modules/jquery' ),
    LogLog = require( '../../src/index' );

$(function () {
    var log = new LogLog('prefix');
    var logDisable = new LogLog('prefix2');


    //LogLog.disable('*');
    LogLog.disable('prefix');

    log.log('log', ['b', 1], 12, function(a){ var i = 0; });
    log.debug('debug', ['b', 1], 12, function(a){ var i = 0; });
    log.info('info', ['b', 1], 12, function(a){ var i = 0; });
    log.warn('warn', ['b', 1], 12, function(a){ var i = 0; });
    log.error('error', ['b', 1], 12, function(a){ var i = 0; });

    logDisable.log('log', ['b', 1], 12, function(a){ var i = 0; });
    logDisable.debug('debug', ['b', 1], 12, function(a){ var i = 0; });
    logDisable.info('info', ['b', 1], 12, function(a){ var i = 0; });
    logDisable.warn('warn', ['b', 1], 12, function(a){ var i = 0; });
    logDisable.error('error', ['b', 1], 12, function(a){ var i = 0; });

    for(var i = 0; i<100; i++){
        var l = new LogLog('colorTest'+i);
        l.log('testing color in', i);
    }

});