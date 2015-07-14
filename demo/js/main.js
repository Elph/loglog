var LogLog = require( '../../src/index' );

(function () {
    var disabledLog = new LogLog('prefix');

    //LogLog.disable('*');

    // we will disable all logs for "prefix"
    LogLog.disable('prefix');
    disabledLog.log('this log is not visible');
    disabledLog.debug('this debug is not visible');
    disabledLog.info('this info is not visible');
    disabledLog.warn('this warn is not visible');
    disabledLog.error('this error is not visible');

    // then we enable it
    LogLog.enable('prefix');
    disabledLog.log('this one should appear on the console');

    // passing objects to the logger
    var anotherLog = new LogLog('prefix2');
    anotherLog.log('you can pass strings', 'awesome!');
    anotherLog.debug('or numbers', 12);
    anotherLog.info('arrays or objects too', ['b', 1], {foo:12, bar:'aa'});
    anotherLog.warn('functions', function(a){ var i = 0; });
    anotherLog.error('or go crazy', ['b', 1], 12, {data:'cool'}, function(a){ var i = 0; });

    // colored prefixes
    for(var i = 0; i<100; i++){
        var l = new LogLog('colorTest'+i);
        l.log('testing color in', i);
    }

})();