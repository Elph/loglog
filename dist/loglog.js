(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.LogLog = window.LogLog || require( './index' );
},{"./index":2}],2:[function(require,module,exports){
var isColorSupported = require('./isConsoleColorSupported.js');

;(function() {

    var STORAGE_KEY = 'LogLog_Filters';
    var COLORS = [
        //  Red
        '#F44336',
        // Pink
        '#E91E63',
        // Purple
        '#9C27B0',
        // Deep purple
        '#673AB7',
        // INdigo
        '#3F51B5',
        // Blue
        '#2196F3',
        // Light blue
        '#03A9F4',
        // Cyan
        '#00BCD4',
        // Teal
        '#009688',
        // Green
        '#4CAF50',
        // Light green
        '#8BC34A',
        // Lime
        '#CDDC39',
        // Yellow
        '#FFEB3B',
        //Amber
        '#FFC107',
        // Orange
        '#FF9800',
        // Deep orange
        '#FF5722',
        // Brown
        '#795548',
        // Grey
        '#9E9E9E',
        // Blue Grey
        '#607D8B'
    ];

    var instances = [];
    var filterRegExps = [];
    var lastUsedColorIndex = 0;

    function LogLog(prefix) {
        // Enforces new.
        if (!(this instanceof LogLog)) {
            return new LogLog(prefix);
        }

        prefix = sanitize(prefix);

        if (prefix && isPrefixUsed(prefix, instances)) {
            return getByPrefix(prefix, instances);
        }

        this.prefix = prefix;
        if(isColorSupported()){
            this.prefixColor = COLORS[lastUsedColorIndex % COLORS.length];
            lastUsedColorIndex += 1;
        }
        instances.push(this);

        filterRegExps = getFromStorage(STORAGE_KEY) || [];
        return this;
    }

    // Static
    // ------

    LogLog.enable = function() {
        Array.prototype.forEach.call(arguments, function(str) {
            addFilter('enable', str);
        })
    };

    LogLog.disable = function() {
        Array.prototype.forEach.call(arguments, function(str) {
            addFilter('disable', str);
        })
    };

    // Public
    // ------

    var methods = ['log', 'debug', 'info', 'warn', 'error'];
    methods.forEach(function(method) {
        LogLog.prototype[method] = function() {
            if (isDisabled(this)) {
                return;
            }
            var args = [].slice.call(arguments);
            if(isColorSupported()){
                args.unshift('color: ' + this.prefixColor + '; font-weight:bold;');
                args.unshift('%c[' + this.prefix +']');
            } else {
                args.unshift('[' + this.prefix + ']');
            }
            console[method].apply(console, args);
        }
    });

    // Private
    // -------

    function isDisabled(instance) {
        var _isDisabled = false;
        filterRegExps.forEach(function(filter) {
            var regExp = new RegExp(filter.expr);
            if (filter.type === 'enable' && regExp.test(instance.prefix)) {
                _isDisabled = false;
            } else if (filter.type === 'disable' &&
                regExp.test(instance.prefix)) {
                _isDisabled = true;
            }
        });

        return _isDisabled;
    }

    function addFilter(type, str) {
        if (str[0] === '-') {
            if(type == 'enable') {
                LogLog.disable(str.substr(1));
            }
            if(type == 'disable') {
                LogLog.enable(str.substr(1));
            }
        }

        var expression = '^' + str.replace(/\*/g, '.*?') + '$';
        if (str === '*') {
            filterRegExps = [{ type: type, expr: expression }];
        } else {
            filterRegExps.push({ type: type, expr: expression });
        }

        setToStorage(STORAGE_KEY, filterRegExps);
    }

    function isPrefixUsed(prefix, instances) {
        var instance = getByPrefix(prefix, instances);
        return instance !== undefined;
    }

    function getByPrefix(prefix, instances) {
        for (var i = 0; i < instances.length ; i++){
            if (instances[i].prefix === prefix) {
                return instances[i];
            }
        }
        return undefined;
    }

    function sanitize(str) {
        return (typeof str === 'string') ? str.replace(/\%c/g, '') : str
    }

    function supports_html5_storage(){
        try{
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch(e) {
            return false;
        }
    }

    function setToStorage(key, value){
        if(!supports_html5_storage())
            return;
        localStorage[key] = JSON.stringify(value);
    }
    function getFromStorage(key){
        if(!supports_html5_storage())
            return undefined;

        try {
            return JSON.parse(localStorage[key]);
        } catch(e){
            console.error('Cannot load filter from localStorage', e);
        }
    }

    module.exports = LogLog;

}());



},{"./isConsoleColorSupported.js":3}],3:[function(require,module,exports){

module.exports = function (){
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    var isWebkit = ('WebkitAppearance' in document.documentElement.style);
    // Is firebug? http://stackoverflow.com/a/398120/376773
    var isFirebug = ( window.console && (console.firebug || (console.exception && console.table)) );
    // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/
    //  Web_Console#Styling_messages
    var isFirefox31Plus = (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
    return (isWebkit || isFirebug || isFirefox31Plus);
};
},{}]},{},[1])