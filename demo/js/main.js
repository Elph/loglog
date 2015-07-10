var LogLog = require( '../../src/index' );

(function () {
    var log = new LogLog('prefix');
    var anotherLog = new LogLog('prefix2');


    //LogLog.disable('*');
    LogLog.disable('prefix');

    log.log('!hello log', ['b', 1], 12, function(a){ var i = 0; });
    log.debug('!hello debug', ['b', 1], 12, function(a){ var i = 0; });
    log.info('!hello info', ['b', 1], 12, function(a){ var i = 0; });
    log.warn('!hello warn', ['b', 1], 12, function(a){ var i = 0; });
    log.error('!hello error', ['b', 1], 12, function(a){ var i = 0; });

    anotherLog.log('hello log', ['b', 1], 12, function(a){ var i = 0; });
    anotherLog.debug('hello debug', ['b', 1], 12, function(a){ var i = 0; });
    anotherLog.info('hello info', ['b', 1], 12, function(a){ var i = 0; });
    anotherLog.warn('hello warn', ['b', 1], 12, function(a){ var i = 0; });
    anotherLog.error('hello error', ['b', 1], 12, function(a){ var i = 0; });

    for(var i = 0; i<100; i++){
        var l = new LogLog('colorTest'+i);
        l.log('testing color in', i);
    }

})();