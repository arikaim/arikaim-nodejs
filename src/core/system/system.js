'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

const Path = require('./path.js');

module.exports = class System {
    static log(msg) {
        console.log(msg);
    }
    
    static include(name) {
        return require(Path.getBasePath() + name);
    }
}

global.include = function(name) {
    return System.include(name);
}

global.isFunction = function(variable) {
    if (typeof variable === 'function') return true;    
    return false;
}

global.callFunction = function(function_name,params) {
    if (isFunction(function_name) == true) {
        return function_name(params);
    }
    return null;
}

global.isJSON = function(json) {
    try {
        var json = JSON.stringify(json);
        var json = JSON.parse(json);
        if (typeof(json) == 'string') {
            if (json.length == 0) return false;
        }
           
    }
    catch (e) {
        return false;
    }

    return true;
}

global.getObjectProperty = function(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}

global.getValue = function(path,obj,defaultValue) {
    var val = getObjectProperty(path,obj);
    if (val == null) {
        val = defaultValue;
    }
    return val;
}

global.getDefaultValue = function(variable, defaultValue) {
    if (isEmpty(variable) == true) {
        return defaultValue;
    }
    return variable;
}

global.isEmpty = function(variable) {
    if (variable === undefined) return true;
    if (variable === null) return true;
    if (variable === "") return true;
    return false;
}

global.isObject = function(variable) {
    return (typeof variable === 'object');
}

global.isArray = function(variable) {
    if (isEmpty(variable) == true) return false;
    return (variable.constructor === Array);
}
