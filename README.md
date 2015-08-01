# LogLog

Simple frontend logger. It supports prefixing and coloring.
The prefix can be enabled or disabled and it's saved on localStorage

Heavily inspired in front-log and LogDown

## How to use

    var LogLog = require('LogLog');

    var log = new LogLog('prefix');
    log.log('log', ['b', 1], 12, function(a){ var i = 0; });
    log.debug('debug', ['b', 1], 12, function(a){ var i = 0; });
    log.info('info', ['b', 1], 12, function(a){ var i = 0; });
    log.warn('warn', ['b', 1], 12, function(a){ var i = 0; });
    log.error('error', ['b', 1], 12, function(a){ var i = 0; });

You can enable o disable a prefix or all (*) using the static

     LogLog.disable('*');
     LogLog.disable('prefix');

     LogLog.enable('*');
     LogLog.enable('prefix');
