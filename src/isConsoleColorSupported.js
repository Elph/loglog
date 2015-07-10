
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